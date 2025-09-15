// src/MainPage/Main.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Topnav";
import SearchModal from "../components/SearchModal";

import EventCalendar from "../MainPage/EventCalendar.jsx";// ✅ 분리한 캘린더
import EventPanel from "../MainPage/EventPanel.jsx";      // ✅ 분리한 우측 패널
import { playAPI } from "../services/api";




// 카테고리 버튼 데이터 (API에서 받아올 예정)
const DEFAULT_CATS = [
  { 
    label: "Comedy", 
    slug: "comedy", 
    icon: "😄",
    description: "웃음과 유머"
  },
  { 
    label: "Romance", 
    slug: "romance", 
    icon: "💕",
    description: "사랑과 로맨스"
  },
  { 
    label: "Horror", 
    slug: "horror", 
    icon: "👻",
    description: "공포와 스릴"
  },
  { 
    label: "Tragedy", 
    slug: "tragedy", 
    icon: "😢",
    description: "비극과 슬픔"
  },
  { 
    label: "Thriller", 
    slug: "thriller", 
    icon: "💥",
    description: "긴장과 액션"
  },
  { 
    label: "Musical", 
    slug: "musical", 
    icon: "🎵",
    description: "음악과 노래"
  },
];

/* 유틸 */
const fmt = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const inRange = (day, start, end) => day >= start && day <= end;

/* ---------------- 상단 메인이벤트(Hero) ---------------- */
function Hero({ plays, isLoading, error }) {
  const [idx, setIdx] = useState(0);
  const total = plays?.length || 0;

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => setIdx((prev) => (prev + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [total]);

  if (isLoading) {
    return (
      <header className="hero">
        <h1>당신을 위한 추천</h1>
        <p>로컬로 살기, 한국 탐험하기.</p>
        <div className="loading-spinner">로딩 중...</div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="hero">
        <h1>당신을 위한 추천</h1>
        <p>로컬로 살기, 한국 탐험하기.</p>
        <div className="error-message">
          <p>⚠️ {error}</p>
          <p>백엔드 서버가 실행 중인지 확인해주세요.</p>
        </div>
      </header>
    );
  }

  if (!plays || plays.length === 0) {
    return (
      <header className="hero">
        <h1>당신을 위한 추천</h1>
        <p>로컬로 살기, 한국 탐험하기.</p>
        <div className="no-data">데이터를 불러올 수 없습니다.</div>
      </header>
    );
  }

  const current = plays[idx % total];
  console.log('포스터:', current.title, current.posterUrl); 

  // current가 유효한지 한번 더 확인
  if (!current) {
    return (
      <header className="hero">
        <h1>당신을 위한 추천</h1>
        <p>로컬로 살기, 한국 탐험하기.</p>
        <div className="no-data">데이터를 불러올 수 없습니다.</div>
      </header>
    );
  }

  return (
    <header className="hero">
      <h1>당신을 위한 추천</h1>
      <p>로컬로 살기, 한국 탐험하기.</p>

      {/* 한 장만 표시 */}
      <div className="poster-carousel" style={{ justifyContent: "center" }}>
        <div className="poster-card" style={{ maxWidth: "85vw", width: "100%", minHeight: "auto" }}>
          <a 
            href={current.detailUrl || "https://www.interpark.com"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="poster-link"
          >
            <img referrerPolicy="no-referrer" src={current.posterUrl}
 alt={current.title} className="poster-img" />
          </a>
          <div className="poster-title">{current.title}</div>
          {current.location?.address && (
            <div className="poster-location">{current.location.address}</div>
          )}
        </div>
      </div>

      {/* 좌우 버튼 + 인디케이터 유지 */}
      <div className="slide-indicator">
        <button type="button" aria-label="이전" onClick={() => setIdx((i) => (i - 1 + total) % total)}>‹</button>
        <span>{(idx % total) + 1}/{total}</span>
        <button type="button" aria-label="다음" onClick={() => setIdx((i) => (i + 1) % total)}>›</button>
      </div>
    </header>
  );
}

/* ---------------- 카테고리 그리드 ---------------- */
function CategoryGrid({ onPick }) {
  return (
    <section className="section">
      <div className="cat-grid">
        {DEFAULT_CATS.map((c) => (
          <button key={c.slug} className="cat" onClick={() => onPick(c.slug)}>
            <div className="cat-box">
              <div className="cat-icon">{c.icon}</div>
            </div>
            <div className="cat-label">{c.label}</div>
            <div className="cat-description">{c.description}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 메인 컴포넌트 ---------------- */
export default function Main() {
  const navigate = useNavigate();
  const goGenre = (slug) => navigate(`/genre?category=${slug}`);

  // 검색 모달 제어
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ✅ 날짜 선택 상태
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedKey = fmt(selectedDate);

  // API 데이터 상태
  const [plays, setPlays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 로딩
  useEffect(() => {
    const fetchPlays = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const playsData = await playAPI.getPlays();
        setPlays(playsData);
      } catch (err) {
        console.error('Failed to fetch plays:', err);
        setError(err.message || '연극 데이터를 불러오는데 실패했습니다.');
        setPlays([]); // 빈 배열로 설정
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlays();
  }, []);

  // ✅ 선택 날짜에 속하는 이벤트만 필터 (현재는 plays 데이터에 날짜 정보가 없으므로 빈 배열)
  const eventsOfDay = useMemo(() => [], [selectedKey]);

  // ✅ 달력에 표시할 마커 (현재는 plays 데이터에 날짜 정보가 없으므로 빈 Set)
  const markers = useMemo(() => new Set(), []);

  return (
    <div className="main-page">
      {/* 커튼 배경 요소들 */}
      <div className="top-curtain"></div>
      <div className="curtain-decoration"></div>
      
      <Topnav onSearchClick={() => setIsSearchOpen(true)} />
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}

      <div className="spacer" />
      <main className="main-container">
        <Hero plays={plays} isLoading={isLoading} error={error} />
        <CategoryGrid onPick={goGenre} />

        {/* ✅ 좌: 캘린더 / 우: 이벤트 패널 */}
        {/* <section className="schedule">
          <EventCalendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            markers={markers}
          />
          <EventPanel
            date={selectedDate}
            events={eventsOfDay}
          />
        </section> */}
      </main>
    </div>
  );
}


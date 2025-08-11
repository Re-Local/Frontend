// src/MainPage/Main.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../components/Topnav";         // 상단바(유지)
import posters from "./postersData.js";        // 캐러셀용 포스터 데이터
import RightSearchPanel from "../RightSearchPanel/RightSearchPanel.jsx";         // 검색 모달
import "./Main.css";

// 카테고리 버튼 데이터
const CATS = [
  { label: "공연/연극", slug: "theater" },
  { label: "콘서트", slug: "concert" },
  { label: "스포츠", slug: "sports" },
  { label: "전시/행사", slug: "exhibition" },
  { label: "맛집/카페", slug: "food" },
  { label: "아동/가족", slug: "kids" },
  { label: "관광", slug: "tour" },
  { label: "오늘의 추천", slug: "today" },
];

/* ---------------- 상단 메인이벤트(Hero) ---------------- */
function Hero() {
  const [idx, setIdx] = useState(0);
  const total = posters.length || 1;

  // 자동 슬라이드
  useEffect(() => {
    if (total <= 1) return; // 카드가 1장 이하일 때는 타이머 불필요
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const current = posters[idx % total]; // 현재 카드만 사용
  if (!current) return null;            // 데이터 없을 때 안전장치

  return (
    <header className="hero">
      <h1>추천 만한 메인 이벤트</h1>
      <p>Live Local. Explore Korea.</p>

      {/* 한 장만 표시 */}
      <div className="poster-carousel" style={{ justifyContent: "center" }}>
        <div className="poster-card" style={{ maxWidth: 360, width: "100%" }}>
          <img src={current.image} alt={current.title} className="poster-img" />
          <div className="poster-title">{current.title}</div>
          <div className="poster-info">{current.category}</div>
        </div>
      </div>

      {/* 좌우 버튼 + 인디케이터 유지 */}
      <div className="slide-indicator">
        <button onClick={() => setIdx((i) => (i - 1 + total) % total)}>‹</button>
        <span>{(idx % total) + 1}/{total}</span>
        <button onClick={() => setIdx((i) => (i + 1) % total)}>›</button>
      </div>
    </header>
  );
}


/* ---------------- 카테고리 그리드 ---------------- */
function CategoryGrid({ onPick }) {
  return (
    <section className="section">
      <div className="cat-grid">
        {CATS.map((c) => (
          <button key={c.slug} className="cat" onClick={() => onPick(c.slug)}>
            <div className="cat-box" />
            <div className="cat-label">{c.label}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 미니 달력 ---------------- */
function MiniCalendar() {
  const today = new Date();
  const [m, setM] = useState(today.getMonth());
  const [y, setY] = useState(today.getFullYear());

  const firstDow = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = Array.from({ length: firstDow }, () => null).concat(
    Array.from({ length: days }, (_, i) => i + 1)
  );

  return (
    <section className="cal">
      <div className="cal-head">
        <button
          onClick={() => {
            const d = new Date(y, m - 1, 1);
            setY(d.getFullYear());
            setM(d.getMonth());
          }}
        >
          ‹
        </button>
        <h3>
          {y}.{String(m + 1).padStart(2, "0")}
        </h3>
        <button
          onClick={() => {
            const d = new Date(y, m + 1, 1);
            setY(d.getFullYear());
            setM(d.getMonth());
          }}
        >
          ›
        </button>
      </div>

      <div className="cal-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="cal-cell cal-dow">
            {d}
          </div>
        ))}
        {cells.map((d, i) => (
          <div key={i} className="cal-cell">
            {d && <span className="cal-day">{d}</span>}
          </div>
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

  return (
    <div className="main-page">
     <Topnav onSearchClick = {() => setIsSearchOpen(true)} />
      <RightSearchPanel open = {isSearchOpen} onClose={() => setIsSearchOpen(false)} />


      <div className="spacer" />
      <main className="main-container">
        <Hero />
        <CategoryGrid onPick={goGenre} />
        <MiniCalendar />
      </main>
    </div>
  );
}




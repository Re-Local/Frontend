import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Genre.css';
import posters from './postersData';
import TopNav from '../components/Topnav';

const Genre = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // URL에서 장르 가져옴

  const [current, setCurrent] = useState(0);

  // ✅ 필터 상태
  const [filters, setFilters] = useState({
    author: 'all',   // 공식/개인 (데이터 없으면 무시)
    rating: 'all',   // 4.5+, 4.0+ …
    lang: 'all',     // all | en | ko
    period: 'all',   // all | week | month
    q: '',           // 검색어
  });

  // (1) 카테고리 1차 필터
  const filteredPosters = category
    ? posters.filter(p => p.category === category)
    : posters;

  // (2) 상세 필터 적용
  const list = filteredPosters.filter(p => {
    // 평점
    if (filters.rating !== 'all') {
      const min = parseFloat(filters.rating);
      if ((p?.rating ?? 0) < min) return false;
    }
    // 언어
    if (filters.lang !== 'all') {
      const hasEng =
        p?.hasEnglish === true || String(p?.language).toLowerCase() === 'en';
      if (filters.lang === 'en' && !hasEng) return false;
      if (filters.lang === 'ko' && hasEng) return false;
    }
    // 작성자 유형
    if (filters.author !== 'all') {
      if (String(p?.authorType || '').toLowerCase() !== filters.author)
        return false;
    }
    // 기간
    if (filters.period !== 'all') {
      const raw = p?.date || p?.start_time || p?.start || null;
      if (raw) {
        const d = new Date(raw);
        if (!isNaN(d)) {
          const now = new Date();
          if (filters.period === 'week') {
            const diffDays = Math.abs((d - now) / 86400000);
            if (diffDays > 7) return false;
          }
          if (filters.period === 'month') {
            if (
              d.getFullYear() !== now.getFullYear() ||
              d.getMonth() !== now.getMonth()
            ) {
              return false;
            }
          }
        }
      }
    }
    // 검색 (제목/장소/카테고리)
    if (filters.q.trim()) {
      const q = filters.q.trim().toLowerCase();
      const hay = [p?.title, p?.location, p?.category]
        .map(v => String(v ?? '').toLowerCase())
        .join(' | ');
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const len = list.length;

  // 카테고리/목록 길이 바뀌면 인덱스 리셋
  useEffect(() => { setCurrent(0); }, [category, len]);

  // ⛔️ 타이머 한 개만 사용
  useEffect(() => {
    if (len < 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % len);
    }, 5000);
    return () => clearInterval(timer);
  }, [len]);

  const visiblePosters = len
    ? [
        list[current % len],
        list[(current + 1) % len],
        list[(current + 2) % len],
      ].filter(Boolean)
    : [];

  // 필터 핸들러
  const onChange = key => e =>
    setFilters(prev => ({ ...prev, [key]: e.target.value }));
  const onSearch = () =>
    setFilters(prev => ({ ...prev, q: prev.q.trim() }));

  return (
    <div className="genre-container">
      <TopNav />

      <h2 className="genre-title">Recommendation For U</h2>
      {category && <span className="category-chip">{category}</span>}

      {/* ===== 포스터 섹션 (위) ===== */}
      {len === 0 ? (
        <div style={{ opacity: .7, padding: '24px 0' }}>
          조건에 맞는 결과가 없습니다.
        </div>
      ) : (
        <section className="poster-section carousel">
          {visiblePosters.map(p => (
            <div key={p.id} className="poster-card-mine">
              <img src={p.image} alt={p.title} className="poster-img-mine" />
              <div className="poster-title">{p.title}</div>
              <div className="poster-info">
                {p.category} {p.location && `| ${p.location}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ===== 필터 박스 (아래) ===== */}
      <section className="filter-wrap">
        <div className="filter-title">필터</div>

        <div className="filter-grid">
          <div className="filter-item">
            <label>작성자 유형</label>
            <select
              className="filter-select"
              value={filters.author}
              onChange={onChange('author')}
            >
              <option value="all">전체 ({filteredPosters.length}개)</option>
              <option value="official">공식</option>
              <option value="creator">개인</option>
            </select>
          </div>

          <div className="filter-item">
            <label>후기 평점</label>
            <select
              className="filter-select"
              value={filters.rating}
              onChange={onChange('rating')}
            >
              <option value="all">전체 ({filteredPosters.length}개)</option>
              <option value="4.5">4.5+ ⭐</option>
              <option value="4.0">4.0+ ⭐</option>
              <option value="3.5">3.5+ ⭐</option>
            </select>
          </div>

          <div className="filter-item">
            <label>언어</label>
            <select
              className="filter-select"
              value={filters.lang}
              onChange={onChange('lang')}
            >
              <option value="all">전체 ({filteredPosters.length}개)</option>
              <option value="en">영어 지원</option>
              <option value="ko">한국어만</option>
            </select>
          </div>

          <div className="filter-item">
            <label>숙박 시기</label>
            <select
              className="filter-select"
              value={filters.period}
              onChange={onChange('period')}
            >
              <option value="all">전체 ({filteredPosters.length}개)</option>
              <option value="week">이번 주</option>
              <option value="month">이번 달</option>
            </select>
          </div>
        </div>

        <div className="filter-search-row">
          <input
            type="text"
            placeholder="제목·장소 검색"
            value={filters.q}
            onChange={onChange('q')}
            onKeyDown={e => e.key === 'Enter' && onSearch()}
          />
          <button className="btn-primary" onClick={onSearch}>
            검색
          </button>
        </div>
      </section>

      {/* 하단 버튼 */}
      <div className="poster-buttons">
        <button onClick={() => navigate('/genre/all')}>See All</button>
        <button onClick={() => navigate('/genre/recommend')}>
          Recommendation For U
        </button>
      </div>
    </div>
  );
};

export default Genre;

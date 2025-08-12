import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Genre.css';
import posters from './postersData';
import TopNav from '../components/Topnav';

// === 샘플 리뷰 (기존과 동일) =========================================
const SAMPLE_REVIEWS = [
  {
    id: 'r1',
    userName: 'Sarah Kim',
    userBadge: 'JP',
    area: 'Busan',
    activities: ['Market', 'Food', 'Local'],
    tags: ['Location', 'Local', 'Recommend'],
    rating: 5,
    lang: 'en',
    date: '2025-08-10',
    photos: [],
    content:
      'Visited a small local market near Jagalchi. Super friendly vendors and amazing street food! If you want the “real local” vibe, don’t miss this place.',
  },
  {
    id: 'r2',
    userName: 'Minji Lee',
    userBadge: 'KR',
    area: 'Seoul',
    activities: ['Theater', 'Exhibition'],
    tags: ['Recommend'],
    rating: 4,
    lang: 'ko',
    date: '2025-08-09',
    photos: [],
    content:
      '대학로 소극장에서 본 연극이 생각보다 훨씬 좋았어요. 좌석은 좁지만 배우들 연기가 훌륭. 관람 후 인근 카페거리 산책 추천!',
  },
  {
    id: 'r3',
    userName: 'Alex Garcia',
    userBadge: 'US',
    area: 'Jeonju',
    activities: ['Food', 'Hanok'],
    tags: ['Location'],
    rating: 5,
    lang: 'en',
    date: '2025-08-07',
    photos: [],
    content:
      'Jeonju Hanok Village was beautiful. Try bibimbap at a small family-run spot off the main street. Less crowded and more authentic.',
  },
];

function ReviewCard({ review }) {
  const stars = '★★★★★'.slice(0, review.rating) + '☆☆☆☆☆'.slice(review.rating);
  return (
    <article className="review-card">
      <header className="review-header">
        <div className="review-user">
          <div className="review-avatar" aria-hidden />
          <div className="review-user-meta">
            <div className="review-name">
              {review.userName} <span className="review-badge">{review.userBadge}</span>
            </div>
            <div className="review-sub">
              Area: {review.area} | Activities: {review.activities.join(', ')}
            </div>
          </div>
        </div>
        <div className="review-rating" aria-label={`${review.rating} out of 5`}>
          {stars}
        </div>
      </header>

      <div className="review-body">
        <div className="review-photo">
          {review.photos?.length ? (
            <img src={review.photos[0]} alt="review" />
          ) : (
            <div className="photo-placeholder">🖼 사진 영역</div>
          )}
        </div>
        <p className="review-text">{review.content}</p>
      </div>

      <footer className="review-footer">
        <div className="review-chips">
          {review.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <div className="review-actions" role="group" aria-label="review actions">
          <button className="icon-btn" title="like">♥ 0</button>
          <button className="icon-btn" title="comment">💬 0</button>
          <button className="icon-btn" title="share">🔗 공유</button>
        </div>
      </footer>
    </article>
  );
}
// ====================================================================

const COUNTRY_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'uk', label: '영국' },
  { value: 'us', label: '미국' },
  { value: 'cn', label: '중국' },
  { value: 'jp', label: '일본' },
  { value: 'es', label: '스페인' },
  { value: 'de', label: '독일' },
  { value: 'kr', label: '한국' },
];

const LANG_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'en', label: '영어' },
  { value: 'es', label: '스페인어' },
  { value: 'ja', label: '일본어' },
  { value: 'zh', label: '중국어' },
  { value: 'de', label: '독일어' },
];

const Genre = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // URL에서 장르

  const [current, setCurrent] = useState(0);

  // === 필터 상태 (요청대로 4종) =========================
  const [filters, setFilters] = useState({
    country: 'all',
    language: 'all',
    ratingSort: 'none', // 'high' | 'low'
    viewsSort: 'none',  // 'desc'
    q: '',
  });

  // See all / Filtering 토글
  const [viewMode, setViewMode] = useState('all'); // 'all' | 'filtered'

  // (1) 카테고리 1차 필터
  const baseList = useMemo(() => {
    return category ? posters.filter((p) => p.category === category) : posters;
  }, [category]);

  // (2) 상세 필터/정렬 (Filtering일 때만 적용)
  const filteredSortedList = useMemo(() => {
    let arr = [...baseList];

    // 국가별
    if (filters.country !== 'all') {
      arr = arr.filter((p) => {
        const v =
          (p.country || p.locationCountry || p.countryCode || '').toString().toLowerCase();
        return v === filters.country;
      });
    }
    // 언어별
    if (filters.language !== 'all') {
      const code = filters.language.toLowerCase();
      arr = arr.filter((p) => {
        const lang =
          (p.language || p.lang || (p.hasEnglish ? 'en' : '')).toString().toLowerCase();
        return lang === code;
      });
    }
    // 검색어
    if (filters.q.trim()) {
      const q = filters.q.trim().toLowerCase();
      arr = arr.filter((p) => {
        const hay = [p?.title, p?.location, p?.category]
          .map((v) => String(v ?? '').toLowerCase())
          .join(' | ');
        return hay.includes(q);
      });
    }

    // 정렬: 후기 평점
    if (filters.ratingSort === 'high') {
      arr.sort((a, b) => (b?.rating ?? 0) - (a?.rating ?? 0));
    } else if (filters.ratingSort === 'low') {
      arr.sort((a, b) => (a?.rating ?? 0) - (b?.rating ?? 0));
    }

    // 정렬: 조회수 (선택 시 우선 적용)
    if (filters.viewsSort === 'desc') {
      arr.sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0));
    }

    return arr;
  }, [baseList, filters]);

  // 최종 표시 목록
  const list = viewMode === 'all' ? baseList : filteredSortedList;
  const len = list.length;

  // 캐러셀 인덱스 리셋
  useEffect(() => { setCurrent(0); }, [category, len, viewMode]);

  // 캐러셀 타이머
  useEffect(() => {
    if (len < 1) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % len), 5000);
    return () => clearInterval(timer);
  }, [len]);

  const visiblePosters = len
    ? [list[current % len], list[(current + 1) % len], list[(current + 2) % len]].filter(Boolean)
    : [];

  // 이벤트 핸들러
  const onChange = (key) => (e) => {
    const value = e.target.value;
    setFilters((prev) => {
      // 조회수 정렬을 선택하면 평점 정렬 초기화(우선순위 충돌 방지)
      if (key === 'viewsSort' && value === 'desc') {
        return { ...prev, [key]: value, ratingSort: 'none' };
      }
      return { ...prev, [key]: value };
    });
  };
  const onSearch = () => setFilters((prev) => ({ ...prev, q: prev.q.trim() }));

  const resetToAll = () => {
    setViewMode('all');
    setFilters({ country: 'all', language: 'all', ratingSort: 'none', viewsSort: 'none', q: '' });
  };

  // 리뷰는 언어 필터만 가볍게 연동 (그 외는 기존 그대로)
  const filteredReviews =
    filters.language === 'all'
      ? SAMPLE_REVIEWS
      : SAMPLE_REVIEWS.filter((r) =>
          filters.language === 'en' ? r.lang === 'en' : r.lang === 'ko'
        );

  return (
    <div className="genre-container">
      <TopNav />

      <h2 className="genre-title">Recommendation For U</h2>
      {category && <span className="category-chip">{category}</span>}

      {/* ===== 포스터 섹션 (위) ===== */}
      {len === 0 ? (
        <div style={{ opacity: 0.7, padding: '24px 0' }}>조건에 맞는 결과가 없습니다.</div>
      ) : (
        <section className="poster-section carousel">
          {visiblePosters.map((p) => (
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

      {/* ===== 필터 박스 ===== */}
      <section className="filter-wrap">
        <div className="filter-title">필터</div>

        <div className="filter-grid">
          {/* 국가별 */}
          <div className="filter-item">
            <label>국가별</label>
            <select className="filter-select" value={filters.country} onChange={onChange('country')}>
              {COUNTRY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label} ({baseList.length}개)
                </option>
              ))}
            </select>
          </div>

          {/* 언어별 */}
          <div className="filter-item">
            <label>언어별</label>
            <select
              className="filter-select"
              value={filters.language}
              onChange={onChange('language')}
            >
              {LANG_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label} ({baseList.length}개)
                </option>
              ))}
            </select>
          </div>

          {/* 후기평점 */}
          <div className="filter-item">
            <label>후기 평점</label>
            <select
              className="filter-select"
              value={filters.ratingSort}
              onChange={onChange('ratingSort')}
            >
              <option value="none">정렬 없음</option>
              <option value="high">평점 높은순</option>
              <option value="low">평점 낮은순</option>
            </select>
          </div>

          {/* 조회수 */}
          <div className="filter-item">
            <label>조회수</label>
            <select
              className="filter-select"
              value={filters.viewsSort}
              onChange={onChange('viewsSort')}
            >
              <option value="none">정렬 없음</option>
              <option value="desc">조회수 높은순</option>
            </select>
          </div>
        </div>

        {/* 검색창은 유지 */}
        <div className="filter-search-row">
          <input
            type="text"
            placeholder="제목·장소 검색"
            value={filters.q}
            onChange={onChange('q')}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
          <button className="btn-primary" onClick={onSearch}>
            검색
          </button>
        </div>
      </section>

      {/* ===== 보기 모드 토글 (필터 아래 / 리뷰 위) ===== */}
      <div className="mode-toggle">
        <button
          className={`mode-btn ${viewMode === 'all' ? 'active' : ''}`}
          onClick={resetToAll}
        >
          See all
        </button>
        <button
          className={`mode-btn ${viewMode === 'filtered' ? 'active' : ''}`}
          onClick={() => setViewMode('filtered')}
        >
          Filtering
        </button>
        <span className="mode-info">
          {viewMode === 'all' ? `전체 ${baseList.length}개` : `필터 적용 ${filteredSortedList.length}개`}
        </span>
      </div>

      {/* ===== 리뷰 섹션 ===== */}
      <section className="review-wrap">
        <div className="review-title-row">
          <h3>Community Reviews</h3>
          <span className="review-count">{filteredReviews.length}개</span>
        </div>

        <div className="review-list">
          {filteredReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Genre;

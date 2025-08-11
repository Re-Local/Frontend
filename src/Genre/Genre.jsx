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

  // 해당 장르만 필터
  const filteredPosters = category
    ? posters.filter(p => p.category === category)
    : posters;

    const len = filteredPosters.length;
// 카테고리 바뀌면 인덱스 리셋 (안하면 범위 밖 인덱스가 남을 수 있음)
useEffect(() => { setCurrent(0); }, [category]);
useEffect(() => {
  if (len < 1) return;                 // 빈 배열이면 타이머 만들지 않음
  const timer = setInterval(() => {
    setCurrent(prev => (prev + 1) % len);
  }, 5000);
  return () => clearInterval(timer);
}, [len]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % filteredPosters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [filteredPosters.length]);

  const visiblePosters = len
  ? [
      filteredPosters[current % len],
      filteredPosters[(current + 1) % len],
      filteredPosters[(current + 2) % len],
    ]
  : [];
  
  return (
    <div className="genre-container">
      <TopNav />
      <h2>{category ? `${category} 포스터` : '전체 포스터'}</h2>

      <section className="poster-section carousel">
        {visiblePosters.map((p) => (
          <div key={p.id} className="poster-card-mine">
            <img src={p.image} alt={p.title} className="poster-img-mine" />
            <div className="poster-title">{p.title}</div>
            <div className="poster-info">{p.category} {p.location && `| ${p.location}`}</div>
          </div>
        ))}
      </section>

      <div className="poster-buttons">
        <button onClick={() => navigate('/genre/all')}>See All</button>
        <button onClick={() => navigate('/genre/recommend')}>Recommendation For U</button>
      </div> 
    </div>
  );
};

export default Genre;

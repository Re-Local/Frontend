import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Genre.css';
import posters from './postersData';

const Genre = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // URL에서 장르 가져옴

  const [current, setCurrent] = useState(0);

  // 해당 장르만 필터
  const filteredPosters = category
    ? posters.filter(p => p.category === category)
    : posters;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % filteredPosters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [filteredPosters.length]);

  const visiblePosters = [
    filteredPosters[current % filteredPosters.length],
    filteredPosters[(current + 1) % filteredPosters.length],
    filteredPosters[(current + 2) % filteredPosters.length]
  ];
  
  return (
    <div className="genre-container">
      <h2>{category ? `${category} 포스터` : '전체 포스터'}</h2>

      <section className="poster-section carousel">
        {visiblePosters.map((p) => (
          <div key={p.id} className="poster-card">
            <img src={p.image} alt={p.title} className="poster-img" />
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

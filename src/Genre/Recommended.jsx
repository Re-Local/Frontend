import React from 'react';
import './Recommended.css'; 
import posters from './postersData';

const Recommended = () => {
  // 추천 기준: match 값이 있는 항목 중 90 이상
  const recommended = posters
    .filter(p => p.match && p.match >= 90)
    .sort((a, b) => b.match - a.match);

  return (
    <div className="genre-container">
      <section className="match-section">
        <div className="match-header">
          <h3>Your Perfect Matches</h3>
          <button className="refresh-btn">🔄 Refresh</button>
        </div>

        {recommended.map((p) => (
          <div key={p.id} className="match-card">
            <div
              className="match-image"
              style={{
                backgroundImage: `url(${p.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>

            <div className="match-info">
              <div className="match-percentage">{p.match}% Match</div>
              <h4>{p.category} - {p.title}</h4>
              <p>장소: {p.location}</p>
              <p>날짜: {p.date}</p>

              {p.reasons && (
                <div className="match-reasons">
                  <p>Why this matches you:</p>
                  <div className="reasons">
                    {p.reasons.map((r, i) => (
                      <span key={i}>{r}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="match-footer">
                <span>📅 {p.deadline}</span>
                <span>👥 {p.participants}</span>
                <button className="book-btn">Book</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Recommended;

import React from 'react';
import './Community.css';

const Community = () => {
  return (
    <div className="community-container">
      <header className="community-header">
        <h2>Community</h2>
        <nav className="community-tabs">
          <button className="tab active">Today</button>
          <button className="tab">Top Post</button>
          <button className="tab">Reviews</button>
          <button className="tab">Photos</button>
        </nav>
      </header>

      <main className="community-main">
        <section className="post-section">
          {/* 게시글 카드 리스트 */}
          <div className="post-card">
            <div className="post-header">
              <span className="user-name">Sarah Kim</span>
              <span className="user-country">🇯🇵</span>
              <span className="rating">⭐⭐⭐⭐⭐</span>
            </div>
            <div className="post-image">[사진]</div>
            <div className="post-content">
              <p>여기 너무 좋아요!</p>
              <div className="post-tags">
                <span>#서울</span>
                <span>#이벤트</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="community-sidebar">
          <div className="upcoming-events">
            <h4>Upcoming Events</h4>
            <ul>
              <li>🎉 한강 야시장</li>
              <li>🎨 인사동 전시회</li>
            </ul>
          </div>
          <div className="community-lists">
            <h4>Community Lists</h4>
            <ul>
              <li>📌 나만의 커뮤니티</li>
              <li>💬 동행 구해요</li>
            </ul>
          </div>
          <div className="popular-tags">
            <h4>Popular Tags</h4>
            <div className="tags">
              <span>#데이트</span>
              <span>#가족</span>
              <span>#주말추천</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Community;

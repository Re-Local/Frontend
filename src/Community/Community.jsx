// /src/Community/Community.jsx
import React from "react";
import Topnav from '../components/Topnav';

import "./Community.css";

const Community = () => {
  return (
    <div className="community-page">
      {/* Header */}
      
      <Topnav />
        
        <h2>Welcome to our Community</h2>
     
      

      {/* Filters */}
      <div className="community-filters">
        <select>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
        <button className="tab active">Top Post</button>
        <button className="tab">⭐ Views</button>
        <button className="tab">📷 Photos</button>
      </div>

      {/* Upload box */}
      <div className="upload-box">
        <img src="/profile.png" alt="User" className="profile-pic" />
        <textarea placeholder="Share your Korean cultural experiences..." />
        <div className="upload-options">
          <button>📷 Add Photo</button>
          <button>📍 Add Location</button>
          <button className="submit-btn">Share Experience</button>
        </div>
      </div>

      {/* Main Feed */}
      <main className="community-main">
        {/* Left Feed */}
        <section className="feed-left">
          <div className="post-card">
            <div className="post-user">
              <img src="/profile.png" alt="Sarah Kim" className="profile-pic" />
              <div className="user-info">
                <strong>Sarah Kim 🇯🇵</strong>
                <p>Area: Busan | Activities: Market, Food, Local</p>
              </div>
              <span className="rating">★★★★★</span>
            </div>
            <div className="post-photo">사진 영역</div>
            <div className="post-tags">
              <button>📍 Location</button>
              <button>🍲 Local Activities</button>
              <button>🎟️ Recommend Place</button>
            </div>
            <div className="post-actions">
              ❤️ 56 | 💬 8 | 🔗 공유
            </div>
          </div>

          {/* More post-cards... */}
        </section>

        {/* Right Sidebar */}
        <aside className="feed-right">
          <div className="upcoming-events">
            <h4>Upcoming Events</h4>
            <ul>
              <li>🎭 연극 A - 8/10</li>
              <li>🎬 영화 B - 8/12</li>
              <li>🎤 콘서트 C - 8/14</li>
            </ul>
            <button className="view-all">View All Events</button>
          </div>

          <div className="community-lists">
            <h4>Community Lists</h4>
            <ul>
              <li>📌 나라별 게시판</li>
              <li>📌 동행 구해요</li>
              <li>📌 리뷰 / 추천 게시판</li>
              <li>⋯</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Community;

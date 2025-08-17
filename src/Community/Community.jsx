import React, { useState } from "react";
import Topnav from '../components/Topnav';
import SearchModal from '../components/SearchModal';
import './Community.css';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Sarah Kim 🇯🇵",
      area: "Busan",
      tags: ["📍 Location", "🍲 Local", "🎟️ Recommend"],
      rating: "★★★★★",
      content: "사진 영역",
      text: "Area: Busan | Activities: Market, Food, Local"
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleShare = () => {
    if (!newPost.trim()) return;

    const newPostData = {
      id: posts.length + 1,
      name: "You 🌸",
      area: "Seoul",
      tags: ["📍 Location", "🎨 Culture"],
      rating: "★★★★",
      content: "사진 영역",
      text: "Area: Seoul | Activities: Culture, Food",
      description: newPost.trim()
    };

    setPosts([newPostData, ...posts]);
    setNewPost(""); // 입력창 초기화
  };

  return (
    <div className="community-page">
      <Topnav onSearchClick={() => setIsSearchOpen(true)} />
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}

      <h2 className="community-title">🎀 Welcome to our Community 🎀</h2>

      {/* 필터 탭 */}
      <div className="community-filters">
        <select className="filter-select">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
        <button className="tab active">Top Post</button>
        <button className="tab">⭐ Views</button>
        <button className="tab">📷 Photos</button>
      </div>

      {/* 공유 업로드 박스 */}
      <section className="upload-box">
        <div className="upload-header">
          <img src="/profile.png" alt="User" className="profile-pic" />
          <textarea
            placeholder="Share your Korean cultural experiences..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </div>
        <div className="upload-options">
          <button>📷 Add Photo</button>
          <button>📍 Add Location</button>
          <button className="submit-btn" onClick={handleShare}>Share 💖</button>
        </div>
      </section>

      {/* 커뮤니티 메인 */}
      <main className="community-main">
        {/* 왼쪽 피드 */}
        <section className="feed-left">
          {posts.map(post => (
            <div className="post-card" key={post.id}>
              <div className="post-user">
                <img src="/profile.png" alt={post.name} className="profile-pic" />
                <div className="user-info">
                  <strong>{post.name}</strong>
                  <p>{post.text}</p>
                </div>
                <span className="rating">{post.rating}</span>
              </div>
              <div className="post-photo">📷 {post.content}</div>
              {post.description && (
                <p style={{ marginTop: "10px", color: "#444" }}>{post.description}</p>
              )}
              <div className="post-tags">
                {post.tags.map((tag, idx) => (
                  <button key={idx}>{tag}</button>
                ))}
              </div>
              <div className="post-actions">
                ❤️ 0 | 💬 0 | 🔗 공유
              </div>
            </div>
          ))}
        </section>

        {/* 오른쪽 사이드바 */}
        <aside className="feed-right">
          <div className="upcoming-events">
            <h4>📅 Upcoming Events</h4>
            <ul>
              <li>🎭 연극 A - 8/10</li>
              <li>🎬 영화 B - 8/12</li>
              <li>🎤 콘서트 C - 8/14</li>
            </ul>
            <button className="view-all">View All</button>
          </div>

          <div className="community-lists">
            <h4>📝 Community Lists</h4>
            <ul>
              <li>📌 나라별 게시판</li>
              <li>📌 동행 구해요</li>
              <li>📌 리뷰 / 추천</li>
              <li>⋯</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Community;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from '../components/Topnav';
import './Community.css';

const TravelPartner = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: "Alex Chen",
      userBadge: "US",
      destination: "Seoul",
      dates: "2025-02-15 ~ 2025-02-22",
      interests: ["Food", "Culture", "Shopping"],
      content: "Looking for travel partners to explore Seoul together! I'm interested in trying authentic Korean food and visiting traditional markets. Anyone available during these dates?",
      budget: "Medium",
      groupSize: "2-4 people",
      date: "2025-01-15",
      likes: 8,
      comments: 12,
      tags: ["Seoul", "Food", "Culture", "Shopping"]
    },
    {
      id: 2,
      userName: "Maria Garcia",
      userBadge: "ES",
      destination: "Busan",
      dates: "2025-03-01 ~ 2025-03-08",
      interests: ["Beach", "Seafood", "Nature"],
      content: "¡Hola! Busco compañeros de viaje para Busan. Me encanta la playa y la comida de mar. ¿Alguien quiere unirse para explorar la costa sur de Corea?",
      budget: "Budget",
      groupSize: "3-5 people",
      date: "2025-01-14",
      likes: 15,
      comments: 8,
      tags: ["Busan", "Beach", "Seafood", "Nature"]
    },
    {
      id: 3,
      userName: "Hans Mueller",
      userBadge: "DE",
      destination: "Jeju Island",
      dates: "2025-04-10 ~ 2025-04-17",
      interests: ["Hiking", "Nature", "Photography"],
      content: "Guten Tag! Ich suche Reisebegleiter für Jeju Island. Ich möchte wandern und die Natur fotografieren. Wer hat Interesse an Outdoor-Aktivitäten?",
      budget: "Medium",
      groupSize: "2-3 people",
      date: "2025-01-13",
      likes: 6,
      comments: 9,
      tags: ["Jeju", "Hiking", "Nature", "Photography"]
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");

  const destinations = [
    { code: "all", name: "All Destinations", icon: "🗺️" },
    { code: "Seoul", name: "Seoul", icon: "🏙️" },
    { code: "Busan", name: "Busan", icon: "🌊" },
    { code: "Jeju Island", name: "Jeju Island", icon: "🏝️" },
    { code: "Gyeongju", name: "Gyeongju", icon: "🏛️" },
    { code: "Jeonju", name: "Jeonju", icon: "🍜" }
  ];

  const budgets = [
    { code: "all", name: "All Budgets", icon: "💰" },
    { code: "Budget", name: "Budget", icon: "💸" },
    { code: "Medium", name: "Medium", icon: "💳" },
    { code: "Luxury", name: "Luxury", icon: "💎" }
  ];

  const handleShare = () => {
    if (!newPost.trim()) return;

    const newPostData = {
      id: posts.length + 1,
      userName: "You",
      userBadge: "KR",
      destination: "Seoul",
      dates: "2025-02-01 ~ 2025-02-07",
      interests: ["Culture", "Food"],
      content: newPost.trim(),
      budget: "Medium",
      groupSize: "2-4 people",
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      tags: ["New Post"]
    };

    setPosts([newPostData, ...posts]);
    setNewPost("");
  };

  const filteredPosts = posts.filter(post => {
    const destinationMatch = selectedDestination === "all" || post.destination === selectedDestination;
    const budgetMatch = selectedBudget === "all" || post.budget === selectedBudget;
    return destinationMatch && budgetMatch;
  });

  return (
    <div className="community-page">
      <Topnav />
      
      <div className="community-header">
        <button className="back-btn" onClick={() => navigate('/community')}>
          ← Back to Community
        </button>
        <h2 className="community-title">👥 Find Travel Partners</h2>
      </div>

      {/* 필터 */}
      <div className="travel-filters">
        <div className="filter-group">
          <label>Destination:</label>
          <select 
            value={selectedDestination} 
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="filter-select"
          >
            {destinations.map(dest => (
              <option key={dest.code} value={dest.code}>
                {dest.icon} {dest.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Budget:</label>
          <select 
            value={selectedBudget} 
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="filter-select"
          >
            {budgets.map(budget => (
              <option key={budget.code} value={budget.code}>
                {budget.icon} {budget.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 공유 업로드 박스 */}
      <section className="upload-box">
        <div className="upload-header">
          <img src="/profile.png" alt="User" className="profile-pic" />
          <textarea
            placeholder="Looking for travel partners? Share your travel plans, interests, and dates..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </div>
        <div className="upload-options">
          <button>🗺️ Add Destination</button>
          <button>📅 Add Dates</button>
          <button className="submit-btn" onClick={handleShare}>Find Partners 💖</button>
        </div>
      </section>

      {/* 게시글 목록 */}
      <main className="community-main">
        <section className="feed-left">
          {filteredPosts.map(post => (
            <article className="review-card" key={post.id}>
              <header className="review-header">
                <div className="review-user">
                  <div className="review-avatar" aria-hidden />
                  <div className="review-user-meta">
                    <div className="review-name">
                      {post.userName} <span className="review-badge">{post.userBadge}</span>
                    </div>
                    <div className="review-sub">
                      {post.destination} | {post.dates}
                    </div>
                  </div>
                </div>
                <div className="travel-info">
                  <span className="budget-badge">{post.budget}</span>
                  <span className="group-size">{post.groupSize}</span>
                </div>
              </header>

              <div className="review-body">
                <div className="review-photo">
                  <div className="photo-placeholder">👥 Travel Partner</div>
                </div>
                <div className="travel-details">
                  <p className="review-text">{post.content}</p>
                  <div className="interests-tags">
                    <strong>Interests:</strong> {post.interests.join(', ')}
                  </div>
                </div>
              </div>

              <footer className="review-footer">
                <div className="review-chips">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="chip">{tag}</span>
                  ))}
                </div>
                <div className="review-actions">
                  <button className="icon-btn" title="like">
                    ♥ {post.likes}
                  </button>
                  <button className="icon-btn" title="comment">
                    💬 {post.comments}
                  </button>
                  <button className="icon-btn" title="join">🤝 Join</button>
                </div>
              </footer>
            </article>
          ))}
        </section>

        <aside className="feed-right">
          <div className="travel-stats">
            <h4>📊 Travel Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-count">{posts.length}</span>
                <span className="stat-name">Active Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🗺️</span>
                <span className="stat-count">{new Set(posts.map(p => p.destination)).size}</span>
                <span className="stat-name">Destinations</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🌍</span>
                <span className="stat-count">{new Set(posts.map(p => p.userBadge)).size}</span>
                <span className="stat-name">Countries</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TravelPartner;

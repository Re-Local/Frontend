import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from '../components/Topnav';
import CommentModal from './CommentModal';
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
      comments: [
        {
          id: 1,
          author: "SeoulExplorer",
          text: "저도 그 기간에 서울에 있을 예정이에요! 함께 여행하면 좋겠네요.",
          rating: 5,
          date: "2025-01-15"
        },
        {
          id: 2,
          author: "FoodLover",
          text: "명동과 광장시장 추천합니다! 정말 맛있는 길거리 음식들이 많아요.",
          rating: 4,
          date: "2025-01-14"
        }
      ],
      tags: ["Seoul", "Food", "Culture", "Shopping"],
      liked: false,
      rating: 4
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
      comments: [
        {
          id: 3,
          author: "BusanLocal",
          text: "부산의 해변과 해산물은 정말 최고예요! 함께 가면 더 재미있을 것 같아요.",
          rating: 5,
          date: "2025-01-14"
        }
      ],
      tags: ["Busan", "Beach", "Seafood", "Nature"],
      liked: false,
      rating: 5
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
      comments: [
        {
          id: 4,
          author: "JejuHiker",
          text: "제주도 등산 코스 추천해드릴게요! 한라산과 오름들이 정말 아름다워요.",
          rating: 5,
          date: "2025-01-13"
        },
        {
          id: 5,
          author: "NaturePhotographer",
          text: "사진 촬영하기 좋은 장소들을 알려드릴 수 있어요!",
          rating: 4,
          date: "2025-01-12"
        }
      ],
      tags: ["Jeju", "Hiking", "Nature", "Photography"],
      liked: false,
      rating: 4
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [commentModal, setCommentModal] = useState({ 
    isOpen: false, 
    postId: null, 
    postTitle: "",
    comments: []
  });

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
      comments: [],
      tags: ["New Post"],
      liked: false,
      rating: 0
    };

    setPosts([newPostData, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId, commentText, rating) => {
    const newComment = {
      id: Date.now(),
      author: "You",
      text: commentText,
      rating: rating,
      date: new Date().toISOString().split('T')[0]
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));

    // CommentModal의 comments도 업데이트
    setCommentModal(prev => ({
      ...prev,
      comments: [...(prev.comments || []), newComment]
    }));
  };

  const handleRatingChange = (postId, rating) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, rating: rating }
          : post
      )
    );
  };

  const openCommentModal = (postId, postTitle) => {
    const post = posts.find(p => p.id === postId);
    setCommentModal({ 
      isOpen: true, 
      postId, 
      postTitle,
      comments: post?.comments || []
    });
  };

  const closeCommentModal = () => {
    setCommentModal({ 
      isOpen: false, 
      postId: null, 
      postTitle: "",
      comments: []
    });
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
        <h2 className="community-title">👥 Travel Partner</h2>
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
            placeholder="Looking for travel partners? Share your travel plans..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </div>
        <div className="upload-options">
          <button>🗓️ Add Dates</button>
          <button>📍 Add Destination</button>
          <button className="submit-btn" onClick={handleShare}>Share 💖</button>
        </div>
      </section>

      {/* 게시글 목록 */}
      <main className="community-main">
        <section className="feed-left">
          {filteredPosts.map(post => (
            <article className="review-card travel-partner-card" key={post.id}>
              <header className="review-header">
                <div className="review-user">
                  <div className="review-avatar" aria-hidden />
                  <div className="review-user-meta">
                    <div className="review-name">
                      {post.userName} <span className="review-badge">{post.userBadge}</span>
                    </div>
                    <div className="review-sub">
                      Destination: {post.destination} | Budget: {post.budget}
                    </div>
                  </div>
                </div>
                <div className="post-rating-section">
                  {post.rating > 0 && (
                    <div className="post-rating">
                      {'★★★★★'.slice(0, post.rating) + '☆☆☆☆☆'.slice(post.rating)}
                    </div>
                  )}
                </div>
              </header>

              <div className="travel-details">
                <div className="travel-info">
                  <span className="travel-date">📅 {post.dates}</span>
                  <span className="travel-group">👥 {post.groupSize}</span>
                  <span className="travel-interests">
                    🎯 {post.interests.join(', ')}
                  </span>
                </div>
              </div>

              <div className="review-body">
                <p className="review-text">{post.content}</p>
              </div>

              <footer className="review-footer">
                <div className="review-chips">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="chip">{tag}</span>
                  ))}
                </div>
                <div className="review-actions">
                  <button 
                    className={`icon-btn ${post.liked ? 'liked' : ''}`} 
                    title="like"
                    onClick={() => handleLike(post.id)}
                  >
                    ♥ {post.likes}
                  </button>
                  <button 
                    className="icon-btn" 
                    title="comment"
                    onClick={() => openCommentModal(post.id, post.content.substring(0, 30) + "...")}
                  >
                    💬 {post.comments?.length || 0}
                  </button>
                  <button className="icon-btn" title="share">🔗 Share</button>
                </div>
              </footer>
            </article>
          ))}
        </section>

        <aside className="feed-right">
          <div className="travel-stats">
            <h4>📊 Travel Partner Stats</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-count">{posts.length}</span>
                <span className="stat-name">Active Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🌍</span>
                <span className="stat-count">{new Set(posts.map(p => p.destination)).size}</span>
                <span className="stat-name">Destinations</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* 댓글 모달 */}
      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={closeCommentModal}
        onSubmit={handleComment}
        postId={commentModal.postId}
        postTitle={commentModal.postTitle}
        comments={commentModal.comments}
        onRatingChange={handleRatingChange}
      />
    </div>
  );
};

export default TravelPartner;

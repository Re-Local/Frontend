import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from '../components/Topnav';
import CommentModal from './CommentModal';
import './Community.css';

const CountryBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: "Emma Wilson",
      userBadge: "US",
      country: "United States",
      content: "Planning to visit Korea in September! Looking for recommendations for traditional markets and street food in Seoul. Any tips for first-time visitors?",
      date: "2025-01-15",
      likes: 12,
      comments: [
        {
          id: 1,
          author: "TravelExpert",
          text: "명동과 광장시장을 추천합니다! 정말 맛있는 길거리 음식들이 많아요.",
          rating: 5,
          date: "2025-01-15"
        },
        {
          id: 2,
          author: "SeoulLocal",
          text: "첫 방문이라면 홍대나 강남도 좋아요. 현대적이면서도 한국적인 분위기를 느낄 수 있어요.",
          rating: 4,
          date: "2025-01-14"
        }
      ],
      tags: ["Seoul", "Food", "First-time"],
      liked: false,
      rating: 4
    },
    {
      id: 2,
      userName: "Pierre Dubois",
      userBadge: "FR",
      country: "France",
      content: "Bonjour! I'm interested in Korean traditional music and dance. Can anyone recommend good places to experience this in Busan?",
      date: "2025-01-14",
      likes: 7,
      comments: [
        {
          id: 3,
          author: "CultureLover",
          text: "부산국악원에서 정말 좋은 공연을 볼 수 있어요. 전통 무용과 음악을 체험할 수 있습니다.",
          rating: 5,
          date: "2025-01-14"
        }
      ],
      tags: ["Busan", "Culture", "Music"],
      liked: false,
      rating: 5
    },
    {
      id: 3,
      userName: "Yuki Tanaka",
      userBadge: "JP",
      country: "Japan",
      content: "日本の方で韓国旅行を計画している方いませんか？一緒に旅行できたら楽しいと思います。特に釜山の海鮮料理に興味があります。",
      date: "2025-01-13",
      likes: 15,
      comments: [
        {
          id: 4,
          author: "BusanFoodie",
          text: "부산의 해산물은 정말 최고예요! 자갈치시장과 국제시장을 추천합니다.",
          rating: 5,
          date: "2025-01-13"
        },
        {
          id: 5,
          author: "TravelPartner",
          text: "저도 일본에서 오신 분들과 함께 여행하고 싶어요! 연락해주세요.",
          rating: 4,
          date: "2025-01-12"
        }
      ],
      tags: ["Busan", "Seafood", "Travel Partner"],
      liked: false,
      rating: 4
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [commentModal, setCommentModal] = useState({ 
    isOpen: false, 
    postId: null, 
    postTitle: "",
    comments: []
  });

  const countries = [
    { code: "all", name: "All Countries", flag: "🌍" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "CA", name: "Canada", flag: "🇨🇦" }
  ];

  const handleShare = () => {
    if (!newPost.trim()) return;

    const newPostData = {
      id: posts.length + 1,
      userName: "You",
      userBadge: "KR",
      country: "Korea",
      content: newPost.trim(),
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

  const filteredPosts = selectedCountry === "all" 
    ? posts 
    : posts.filter(post => post.userBadge === selectedCountry);

  return (
    <div className="community-page">
      <Topnav />
      
      <div className="community-header">
        <button className="back-btn" onClick={() => navigate('/community')}>
          ← Back to Community
        </button>
        <h2 className="community-title">🌍 Country Board</h2>
      </div>

      {/* 국가별 필터 */}
      <div className="country-filters">
        {countries.map(country => (
          <button
            key={country.code}
            className={`country-filter ${selectedCountry === country.code ? 'active' : ''}`}
            onClick={() => setSelectedCountry(country.code)}
          >
            <span className="country-flag">{country.flag}</span>
            <span className="country-name">{country.name}</span>
          </button>
        ))}
      </div>

      {/* 공유 업로드 박스 */}
      <section className="upload-box">
        <div className="upload-header">
          <img src="/profile.png" alt="User" className="profile-pic" />
          <textarea
            placeholder="Share your country-specific questions or experiences..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </div>
        <div className="upload-options">
          <button>🌍 Add Country</button>
          <button>📷 Add Photo</button>
          <button className="submit-btn" onClick={handleShare}>Share 💖</button>
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
                      Country: {post.country} | Date: {post.date}
                    </div>
                  </div>
                </div>
                <div className="post-rating-section">
                  <div className="post-country-flag">
                    {countries.find(c => c.code === post.userBadge)?.flag || '🌍'}
                  </div>
                  {post.rating > 0 && (
                    <div className="post-rating">
                      {'★★★★★'.slice(0, post.rating) + '☆☆☆☆☆'.slice(post.rating)}
                    </div>
                  )}
                </div>
              </header>

              <div className="review-body">
                <div className="review-photo">
                  <div className="photo-placeholder">🌍 Country Post</div>
                </div>
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
          <div className="country-stats">
            <h4>📊 Country Statistics</h4>
            <div className="stats-grid">
              {countries.slice(1).map(country => {
                const count = posts.filter(post => post.userBadge === country.code).length;
                return (
                  <div key={country.code} className="stat-item">
                    <span className="stat-flag">{country.flag}</span>
                    <span className="stat-count">{count}</span>
                    <span className="stat-name">{country.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </main>

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

export default CountryBoard;

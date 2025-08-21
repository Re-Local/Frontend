import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from '../components/Topnav';
import SearchModal from '../components/SearchModal';
import CommentModal from './CommentModal';
import './Community.css';

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      userName: "Sarah Kim",
      userBadge: "JP",
      area: "Busan",
      activities: ["Market", "Food", "Local"],
      tags: ["Location", "Local", "Recommend"],
      rating: 5,
      lang: "en",
      date: "2025-08-10",
      photos: [],
      content: "Visited a small local market near Jagalchi. Super friendly vendors and amazing street food! If you want the 'real local' vibe, don't miss this place.",
      likes: 0,
      comments: [
        {
          id: 1,
          author: "Traveler123",
          text: "정말 좋은 정보네요! 다음에 부산 갈 때 꼭 가보겠습니다.",
          rating: 4,
          date: "2025-08-10"
        },
        {
          id: 2,
          author: "FoodLover",
          text: "저도 가봤는데 정말 맛있었어요! 추천합니다.",
          rating: 5,
          date: "2025-08-09"
        }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [commentModal, setCommentModal] = useState({
    isOpen: false,
    postId: null,
    postTitle: "",
    comments: []
  });

  const handleShare = () => {
    if (!newPost.trim()) return;

    const newPostData = {
      id: posts.length + 1,
      userName: "You",
      userBadge: "KR",
      area: "Seoul",
      activities: ["Culture", "Food"],
      tags: ["Location", "Culture"],
      rating: 4,
      lang: "ko",
      date: new Date().toISOString().split('T')[0],
      photos: [],
      content: newPost.trim(),
      likes: 0,
      comments: []
    };

    setPosts([newPostData, ...posts]);
    setNewPost(""); // 입력창 초기화
  };

  const handleCommentClick = (post) => {
    setCommentModal({
      isOpen: true,
      postId: post.id,
      postTitle: post.content.substring(0, 50) + (post.content.length > 50 ? "..." : ""),
      comments: post.comments || []
    });
  };

  const handleCommentSubmit = (postId, commentText, rating) => {
    const newComment = {
      id: Date.now(),
      author: "You",
      text: commentText,
      rating: rating,
      date: new Date().toISOString().split('T')[0]
    };

    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...(post.comments || []), newComment],
              comments: (post.comments || []).length + 1
            }
          : post
      )
    );

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

  const closeCommentModal = () => {
    setCommentModal({
      isOpen: false,
      postId: null,
      postTitle: "",
      comments: []
    });
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
            <article 
              className="review-card" 
              key={post.id}
              onClick={() => navigate('/review', { state: { review: post } })}
              style={{ cursor: 'pointer' }}
            >
              <header className="review-header">
                <div className="review-user">
                  <div className="review-avatar" aria-hidden />
                  <div className="review-user-meta">
                    <div className="review-name">
                      {post.userName} <span className="review-badge">{post.userBadge}</span>
                    </div>
                    <div className="review-sub">
                      Area: {post.area} | Activities: {post.activities.join(', ')}
                    </div>
                  </div>
                </div>
                <div className="review-rating" aria-label={`${post.rating} out of 5`}>
                  {'★★★★★'.slice(0, post.rating) + '☆☆☆☆☆'.slice(post.rating)}
                </div>
              </header>

              <div className="review-body">
                <div className="review-photo">
                  {post.photos?.length ? (
                    <img src={post.photos[0]} alt="review" />
                  ) : (
                    <div className="photo-placeholder">🖼 사진 영역</div>
                  )}
                </div>
                <p className="review-text">{post.content}</p>
              </div>

              <footer className="review-footer">
                <div className="review-chips">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="chip">{tag}</span>
                  ))}
                </div>
                <div className="review-actions" role="group" aria-label="review actions">
                  <button className="icon-btn" title="like">
                    ♥ {post.likes}
                  </button>
                  <button 
                    className="icon-btn" 
                    title="comment"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCommentClick(post);
                    }}
                  >
                    💬 {post.comments?.length || 0}
                  </button>
                  <button className="icon-btn" title="share">🔗 공유</button>
                </div>
              </footer>
            </article>
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
              <li onClick={() => navigate('/community/country-board')} className="clickable-list-item">
                📌 나라별 게시판
              </li>
              <li onClick={() => navigate('/community/travel-partner')} className="clickable-list-item">
                📌 동행 구해요
              </li>
              <li onClick={() => navigate('/community/review-recommend')} className="clickable-list-item">
                📌 리뷰 / 추천
              </li>
              <li onClick={() => navigate('/community/discount-ticket')} className="clickable-list-item">
                📌 땡처리 티켓
              </li>
            </ul>
          </div>
        </aside>
      </main>

      {/* 댓글 모달 */}
      <CommentModal
        isOpen={commentModal.isOpen}
        onClose={closeCommentModal}
        onSubmit={handleCommentSubmit}
        postId={commentModal.postId}
        postTitle={commentModal.postTitle}
        comments={commentModal.comments}
        onRatingChange={handleRatingChange}
      />
    </div>
  );
};

export default Community;

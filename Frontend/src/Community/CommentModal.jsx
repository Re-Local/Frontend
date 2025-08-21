import React, { useState } from "react";
import "./Community.css";

const CommentModal = ({ isOpen, onClose, onSubmit, postId, postTitle, comments = [], onRatingChange }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(postId, comment.trim(), rating);
      setComment("");
      setRating(0);
      onClose();
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(postId, value);
    }
  };

  const renderStars = (currentRating, interactive = false) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= currentRating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
            onClick={interactive ? () => handleRatingClick(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            {star <= (interactive ? hoverRating : currentRating) ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comment-modal-header">
          <h3>💬 댓글 & 평점</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="comment-modal-content">
          <div className="post-info">
            <p className="post-title">"{postTitle}"</p>
            <div className="rating-section">
              <span className="rating-label">평점을 남겨주세요:</span>
              {renderStars(rating, true)}
              {rating > 0 && <span className="rating-text">({rating}/5)</span>}
            </div>
          </div>

          {/* 기존 댓글 목록 */}
          <div className="comments-list">
            <h4>💬 댓글 목록 ({comments.length})</h4>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author || '익명'}</span>
                    <span className="comment-date">{comment.date || '방금 전'}</span>
                  </div>
                  {comment.rating > 0 && (
                    <div className="comment-rating">
                      {renderStars(comment.rating)}
                    </div>
                  )}
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
            )}
          </div>

          {/* 새 댓글 작성 */}
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="comment-input"
              rows="4"
              autoFocus
            />
            <div className="comment-modal-actions">
              <button type="button" onClick={onClose} className="cancel-btn">
                취소
              </button>
              <button 
                type="submit" 
                className="submit-comment-btn"
                disabled={!comment.trim()}
              >
                댓글 작성
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css'; // 스타일 따로 관리

const Main = () => {
  const navigate = useNavigate();
  const categories = ['영화', '뮤지컬', '연극', '전시회'];

  return (
    <div className="main-container">
      <h1>카테고리 선택</h1>
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(`/genre?category=${cat}`)}
            className="category-btn"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Main;

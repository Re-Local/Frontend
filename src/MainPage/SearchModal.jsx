import React from "react";
import "./SearchModal.css";

const SearchModal = ({ onClose }) => {
  const trendingKeywords = [
    "서울 불꽃축제",
    "부산 해운대 야시장",
    "전주 한옥마을 체험",
    "제주 감귤 수확",
    "강릉 커피 축제"
  ];

  return (
    <div className="search-modal-overlay">
      <div className="search-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* 검색창 */}
        <div className="search-input-area">
          <input
            type="text"
            placeholder="Search content..."
            className="search-input"
          />
          <button className="search-btn">Go</button>
        </div>

        {/* 실검 박스 */}
        <div className="top-search-box">
          <div className="top-search-header">실시간 검색어</div>
          <ul className="top-search-list">
            {trendingKeywords.map((keyword, idx) => (
              <li key={idx}>
                <span className="rank">{idx + 1}</span>
                <span>{keyword}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

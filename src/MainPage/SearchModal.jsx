import React from "react";
import "./SearchModal.css";

const SearchModal = ({ onClose }) => {
  const trendingKeywords = [
    "서울 핫플레이스",
  "부산 해운대 축제",
  "전시회 일정 확인",
  "뮤지컬 예매 방법",
  "카페 추천 리스트",
  ];

  return (
    <div className="search-modal-overlay">
      <div className="search-modal">
        <button className="close-btn" onClick={onClose}>
          ��
        </button>

        {/* �˻�â */}
        <div className="search-input-area">
          <input
            type="text"
            placeholder="Search content..."
            className="search-input"
          />
          <button className="search-btn">Go</button>
        </div>

        {/* �ǰ� �ڽ� */}
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

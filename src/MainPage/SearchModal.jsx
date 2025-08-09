import React from "react";
import "./SearchModal.css";

const SearchModal = ({ onClose }) => {
  const trendingKeywords = [
    "���� �Ҳ�����",
    "�λ� �ؿ�� �߽���",
    "���� �ѿ����� ü��",
    "���� ���� ��Ȯ",
    "���� Ŀ�� ����"
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
          <div className="top-search-header">�ǽð� �˻���</div>
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

import React, { useState } from 'react';
import './Topnav.css';

const Topnav = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearchToggle = () => {
    setShowSearch(prev => !prev);
    setQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`🔎 Searching for: ${query}`);
      // 실제 검색 로직은 라우터 이동 또는 필터링 함수로 처리
    }
  };

  return (
    <header className="topnav">
      <div className="menu-toggle">☰</div>

      <h1 className="logo">CultureNow</h1>

      <div className="topnav-right">
        <span
          className="search-icon"
          role="img"
          aria-label="search"
          onClick={handleSearchToggle}
        >
          🔍
        </span>
        <button className="lang-btn" onClick={() => alert('언어 변경')}>🌐</button>
      </div>

      {showSearch && (
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Go</button>
        </form>
      )}
    </header>
  );
};

export default Topnav;

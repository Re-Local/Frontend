import React from 'react';
import './Topnav.css';

export default function Topnav({ onSearchClick = () => {} }) {
  return (
    <header className="topnav" style={{ height: '64px' }}>
      <div className="menu-toggle">☰</div>

      <h1 className="logo">CultureNow</h1>

      <div className="topnav-right">
        <span
          className="search-icon"
          role="button"
          tabIndex={0}
          aria-label="search"
          onClick={onSearchClick}
          onKeyDown={(e) => e.key === 'Enter' && onSearchClick()}
        >
          🔍
        </span>
        <button className="lang-btn" onClick={() => alert('언어 변경')}>🌐</button>
      </div>
    </header>
  );
}

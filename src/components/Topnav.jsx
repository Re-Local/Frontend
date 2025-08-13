import React from 'react';
import './Topnav.css';

export default function Topnav({ onSearchClick = () => {} }) {
  return (
    <header className="topnav">
      <div className="menu-toggle">☰</div>

      {/* 로고 + 태그라인 */}
      <div className="logo-wrapper">
        <h1 className="logo">KurtainCall</h1>
        <p className="tagline">Your Gateway to Korea’s Hidden Stages</p>
      </div>

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

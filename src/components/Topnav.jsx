import React from 'react';
import './Topnav.css';

const Topnav = () => {
  return (
    <header className="topnav">
      <div className="menu-toggle">☰</div>

      <h1 className="logo">CultureNow</h1>

      <div className="topnav-right">
        <span className="search-icon" role="img" aria-label="search">🔍</span>
        <button className="lang-btn" onClick={() => alert('언어 변경')}>🌐</button>
      </div>
    </header>
  );
};

export default Topnav;

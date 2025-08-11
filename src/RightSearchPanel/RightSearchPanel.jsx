import React, { useEffect } from "react";
import "./RightSearchPanel.css";

export default function RightSearchPanel({ open, onClose }) {
  // ✅ Hook은 항상 호출
  useEffect(() => {
    if (!open) return; // 패널이 열렸을 때만 리스너 등록
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null; // ✅ Hook 뒤에 조건부 리턴

  const trending = [
    "서울 핫플레이스",
    "부산 해운대 축제",
    "전시회 일정 확인",
    "뮤지컬 예매 방법",
    "카페 추천 리스트",
  ];

  return (
    <>
      <div className="right-panel-overlay" onClick={onClose} />
      <aside className="right-panel">
        <div className="right-panel__header">
          <strong>실시간 검색어</strong>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="right-panel__search">
          <input type="text" placeholder="Search content..." />
          <button>Go</button>
        </div>

        <ul className="right-panel__list">
          {trending.map((k, i) => (
            <li key={i}>
              <span className="rank">{i + 1}</span>
              <span className="keyword">{k}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

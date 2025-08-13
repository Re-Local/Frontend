import React, { useEffect, useState } from "react";
import "./Main.css"; // ��Ÿ���� ���� ���� ���ϴ�.

const fmt = (d) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

export default function EventCalendar({ selected, onSelect, markers = new Set() }) {
  const [m, setM] = useState(selected.getMonth());
  const [y, setY] = useState(selected.getFullYear());

  useEffect(() => {
    setM(selected.getMonth());
    setY(selected.getFullYear());
  }, [selected]);

  const firstDow = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = Array.from({ length: firstDow }, () => null).concat(
    Array.from({ length: days }, (_, i) => i + 1)
  );

  const selKey = fmt(selected);
  const goto = (delta) => {
    const d = new Date(y, m + delta, 1);
    setY(d.getFullYear()); setM(d.getMonth());
  };

  return (
    <section className="cal cal-compact">
      <div className="cal-head">
        <button type="button" onClick={() => goto(-1)}>?</button>
        <h3>{y}.{String(m + 1).padStart(2, "0")}</h3>
        <button type="button" onClick={() => goto(1)}>?</button>
      </div>

      <div className="cal-grid">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="cal-cell cal-dow">{d}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="cal-cell" />;
          const date = new Date(y, m, d);
          const key = fmt(date);
          const isSel = key === selKey;
          const hasEvent = markers.has(key);
          return (
            <div key={i} className="cal-cell">
              <button
                type="button"
                className={`cal-day ${isSel ? "is-selected" : ""}`}
                onClick={() => onSelect(date)}
                aria-label={key}
                title={key}
              >
                {d}
              </button>
              {hasEvent && <span className="cal-dot" aria-hidden="true">��</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

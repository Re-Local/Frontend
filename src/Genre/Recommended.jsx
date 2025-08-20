import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Recommended.css'; 
import Topnav from '../components/Topnav';

const Recommended = () => {
  const location = useLocation();
  const selectedPoster = location.state?.selectedPoster;

  // 달력 상태 관리 - Hooks는 항상 최상위 레벨에서 호출되어야 함
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // 옵션 섹션으로 스크롤하기 위한 ref
  const dateOptionsRef = useRef(null);

  // 날짜가 선택되면 옵션 섹션으로 자동 스크롤
  useEffect(() => {
    if (selectedDate && dateOptionsRef.current) {
      dateOptionsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [selectedDate]);

  // 현재 월의 날짜들 생성
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // 이전 달의 마지막 날짜들
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false, isAvailable: false });
    }
    
    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      // 공연 기간 내의 날짜만 사용 가능하도록 설정
      const isAvailable = isDateInPerformancePeriod(currentDate);
      days.push({ date: currentDate, isCurrentMonth: true, isAvailable });
    }
    
    // 다음 달의 첫 날짜들 (6주 달력을 위해)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false, isAvailable: false });
    }
    
    return days;
  };

  // 공연 기간 내의 날짜인지 확인
  const isDateInPerformancePeriod = (date) => {
    // 모든 날짜를 사용 가능하도록 설정
    return true;
  };

  // 달력 네비게이션
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // 날짜 선택
  const handleDateSelect = (day) => {
    if (day.isAvailable) {
      setSelectedDate(day.date);
    }
  };

  // 선택된 날짜의 옵션들
  const getDateOptions = (date) => {
    if (!date) return [];
    
    // 예시 옵션들 (실제로는 API에서 가져올 데이터)
    return [
      { time: '14:00', price: '50,000 KRW', seats: 'Seats A-1, A-2, A-3', status: 'available' },
      { time: '16:00', price: '50,000 KRW', seats: 'Seats B-1, B-2', status: 'available' },
      { time: '19:00', price: '60,000 KRW', seats: 'Seats C-1, C-2, C-3, C-4', status: 'available' },
      { time: '21:00', price: '60,000 KRW', seats: 'Seats D-1, D-2', status: 'limited' },
    ];
  };

  // 선택된 날짜로 예매하기
  const handleBookForDate = (date) => {
    // 선택된 날짜의 예매 링크로 이동
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const bookingUrl = `https://ticket.interpark.com?date=${formattedDate}&event=${encodeURIComponent(selectedPoster.title)}`;
    window.open(bookingUrl, '_blank');
  };

  const days = getDaysInMonth(currentMonth);
  const dateOptions = getDateOptions(selectedDate);

  return (
    <div className="genre-container">
      <Topnav />
      
      <div className="poster-detail-container">
        {/* 포스터 이미지와 기본 정보 */}
        <div className="poster-main-section">
          <div className="poster-image-container">
            <img 
              src={selectedPoster.image} 
              alt={selectedPoster.title} 
              className="poster-detail-image"
            />
          </div>
          
          <div className="poster-info-section">
            <h1 className="poster-title">{selectedPoster.title}</h1>
            <div className="poster-category">{selectedPoster.category}</div>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">📍 Venue</span>
                <span className="info-value">{selectedPoster.location || 'Venue information not available'}</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">📅 Performance Period</span>
                <span className="info-value">2025.07.01 ~ 2025.07.31</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">⏰ Duration</span>
                <span className="info-value">90 minutes</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">💰 Price</span>
                <span className="info-value">50,000 KRW ~ 60,000 KRW</span>
              </div>
            </div>
          </div>
        </div>

        {/* 달력 섹션 */}
        <div className="calendar-section">
          <h2 className="section-title">📅 Select Date</h2>
          
          <div className="calendar-container">
            <div className="calendar-header">
              <button onClick={goToPreviousMonth} className="month-nav-btn">‹</button>
              <h3 className="current-month">
                {currentMonth.getFullYear()} {currentMonth.getMonth() + 1}
              </h3>
              <button onClick={goToNextMonth} className="month-nav-btn">›</button>
            </div>
            
            <div className="calendar-grid">
              <div className="calendar-weekdays">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
              
              <div className="calendar-days">
                {days.map((day, index) => (
                  <div key={index} className="calendar-day-wrapper">
                    <button
                      className={`calendar-day ${
                        !day.isCurrentMonth ? 'other-month' : ''
                      } ${
                        day.isAvailable ? 'available' : 'unavailable'
                      } ${
                        selectedDate && 
                        day.date.toDateString() === selectedDate.toDateString() 
                          ? 'selected' : ''
                      }`}
                      onClick={() => handleDateSelect(day)}
                      disabled={!day.isAvailable}
                    >
                      {day.date.getDate()}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 선택된 날짜 정보 표시 */}
          {selectedDate && (
            <div className="selected-date-info">
              <h4>Selected Date: {selectedDate.getFullYear()}/{selectedDate.getMonth() + 1}/{selectedDate.getDate()}</h4>
              <p>Select a time slot below to proceed with booking.</p>
            </div>
          )}
        </div>

        {/* 선택된 날짜의 옵션들 */}
        {selectedDate && (
          <div className="date-options-section" ref={dateOptionsRef}>
            <h2 className="section-title">
              📍 Options for {selectedDate.getFullYear()}/{selectedDate.getMonth() + 1}/{selectedDate.getDate()}
            </h2>
            
            <div className="options-grid">
              {dateOptions.map((option, index) => (
                <div key={index} className={`option-card ${option.status}`}>
                  <div className="option-header">
                    <span className="option-time">{option.time}</span>
                    <span className={`option-status ${option.status}`}>
                      {option.status === 'available' ? 'Available' : 'Limited Seats'}
                    </span>
                  </div>
                  
                  <div className="option-details">
                    <div className="option-price">{option.price}</div>
                    <div className="option-seats">{option.seats}</div>
                  </div>
                  
                  <button 
                    className="select-option-btn"
                    onClick={() => handleBookForDate(selectedDate)}
                  >
                    {option.status === 'available' ? 'Book Now' : 'Waitlist'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommended;

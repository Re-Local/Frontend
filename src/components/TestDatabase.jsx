import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './Topnav';
import './TestDatabase.css';

const TestDatabase = () => {
  const navigate = useNavigate();
  const [testHistory, setTestHistory] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // 샘플 테스트 데이터 (실제로는 API나 로컬 스토리지에서 가져올 수 있음)
  useEffect(() => {
    const sampleData = [
      {
        id: 1,
        date: '2024-01-15',
        time: '14:30',
        score: 85,
        status: 'completed',
        questionsAnswered: 20,
        personalityType: 'Extrovert',
        duration: '15분'
      },
      {
        id: 2,
        date: '2024-01-10',
        time: '09:15',
        score: 78,
        status: 'completed',
        questionsAnswered: 20,
        personalityType: 'Ambivert',
        duration: '18분'
      },
      {
        id: 3,
        date: '2024-01-05',
        time: '16:45',
        score: 92,
        status: 'completed',
        questionsAnswered: 20,
        personalityType: 'Introvert',
        duration: '12분'
      },
      {
        id: 4,
        date: '2024-01-01',
        time: '11:20',
        score: 0,
        status: 'incomplete',
        questionsAnswered: 12,
        personalityType: 'N/A',
        duration: '8분'
      }
    ];
    setTestHistory(sampleData);
  }, []);

  const handleTestSelect = (test) => {
    setSelectedTest(test);
  };

  const handleViewDetails = (test) => {
    navigate('/test/results', { 
      state: { 
        testResults: { 
          // 샘플 응답 데이터
          testInfo: test,
          answers: Array.from({ length: 20 }, (_, i) => Math.floor(Math.random() * 7) + 1)
        } 
      } 
    });
  };

  const handleNewTest = () => {
    navigate('/test/my-test');
  };

  const filteredTests = testHistory.filter(test => {
    if (filterStatus === 'all') return true;
    return test.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#90EE90';
      case 'incomplete': return '#FFB6C1';
      default: return '#9ca3af';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return '완료';
      case 'incomplete': return '미완료';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="test-database-container">
      <Topnav />
      
      <div className="test-database-content">
        <div className="test-database-header">
          <div className="header-content">
            <h1 className="test-database-title">Test Database</h1>
            <button className="new-test-btn" onClick={handleNewTest}>
              New Test
            </button>
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="filter-section">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All Tests
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </button>
            <button 
              className={`filter-btn ${filterStatus === 'incomplete' ? 'active' : ''}`}
              onClick={() => setFilterStatus('incomplete')}
            >
              Incomplete
            </button>
          </div>
          <div className="test-count">
            Total: {filteredTests.length} tests
          </div>
        </div>

        {/* 테스트 목록 */}
        <div className="test-list-section">
          <div className="test-list-header">
            <div className="list-header-item">Date</div>
            <div className="list-header-item">Time</div>
            <div className="list-header-item">Score</div>
            <div className="list-header-item">Status</div>
            <div className="list-header-item">Type</div>
            <div className="list-header-item">Duration</div>
            <div className="list-header-item">Actions</div>
          </div>
          
          <div className="test-list">
            {filteredTests.map((test) => (
              <div 
                key={test.id} 
                className={`test-item ${selectedTest?.id === test.id ? 'selected' : ''}`}
                onClick={() => handleTestSelect(test)}
              >
                <div className="test-item-cell">{test.date}</div>
                <div className="test-item-cell">{test.time}</div>
                <div className="test-item-cell score-cell">
                  {test.status === 'completed' ? `${test.score}%` : 'N/A'}
                </div>
                <div className="test-item-cell">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(test.status) }}
                  >
                    {getStatusText(test.status)}
                  </span>
                </div>
                <div className="test-item-cell">{test.personalityType}</div>
                <div className="test-item-cell">{test.duration}</div>
                <div className="test-item-cell actions-cell">
                  <button 
                    className="view-details-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(test);
                    }}
                    disabled={test.status === 'incomplete'}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 선택된 테스트 상세 정보 */}
        {selectedTest && (
          <div className="test-details-section">
            <h3>Test Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Test ID:</span>
                <span className="detail-value">{selectedTest.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedTest.date}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{selectedTest.time}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Score:</span>
                <span className="detail-value">
                  {selectedTest.status === 'completed' ? `${selectedTest.score}%` : 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(selectedTest.status) }}
                  >
                    {getStatusText(selectedTest.status)}
                  </span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Questions:</span>
                <span className="detail-value">{selectedTest.questionsAnswered}/20</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Personality Type:</span>
                <span className="detail-value">{selectedTest.personalityType}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{selectedTest.duration}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDatabase;

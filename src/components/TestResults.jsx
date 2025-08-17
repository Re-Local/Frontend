import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Topnav from './Topnav';
import './TestResults.css';

const TestResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const testResults = location.state?.testResults;

  const handleRetakeTest = () => {
    navigate('/test/my-test');
  };

  if (!testResults) {
    return (
      <div className="testresults-container">
        <Topnav />
        <div className="testresults-content">
          <div className="testresults-header">
            <h1 className="testresults-title">Test Results</h1>
            <p className="testresults-subtitle">No test results found. Please take the test first.</p>
            <button className="retake-btn" onClick={handleRetakeTest}>
              Take Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="testresults-container">
      <Topnav />
      
      <div className="testresults-content">
        <div className="testresults-header">
          <h1 className="testresults-title">Test Results</h1>
          <p className="testresults-subtitle">Your personality test results</p>
        </div>

        <div className="results-summary">
          <h2>Test Summary</h2>
          <p>You completed {Object.keys(testResults).length} questions</p>
          
          <div className="results-breakdown">
            <h3>Response Breakdown:</h3>
            <div className="breakdown-stats">
              <div className="stat-item">
                <span className="stat-label">Strongly Agree (7):</span>
                <span className="stat-value">{Object.values(testResults).filter(v => v === 7).length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Agree (6):</span>
                <span className="stat-value">{Object.values(testResults).filter(v => v === 6).length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Somewhat Agree (5):</span>
                <span className="stat-value">{Object.values(testResults).filter(v => v === 5).length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Neutral (4):</span>
                <span className="stat-value">{Object.values(testResults).filter(v => v === 4).length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Somewhat Disagree (3):</span>
                <span className="stat-value">{Object.values(testResults).filter(v => v === 3).length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Disagree (2):</span>
                <span className="stat-value">{Object.values(testResults).filter(v => v === 2).length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Strongly Disagree (1):</span>
                <span className="stat-value">{Object.values(testResults).filter(v => v === 1).length}</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="retake-btn" onClick={handleRetakeTest}>
              Retake Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;

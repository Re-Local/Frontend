import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './Topnav';
import './MyTest.css';

const MyTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 20개 테스트 질문
  const questions = [
    "주기적으로 새로운 친구를 사귄다",
    "새로운 경험을 시도하는 것을 좋아한다",
    "사람들과 대화할 때 주도적으로 말을 건다",
    "모임이나 파티에서 적극적으로 참여한다",
    "낯선 사람과도 쉽게 대화할 수 있다",
    "그룹 활동에서 리더 역할을 맡는 것을 좋아한다",
    "의견이 다를 때 자신의 생각을 명확히 표현한다",
    "새로운 환경에 빠르게 적응할 수 있다",
    "다른 사람의 감정을 잘 이해한다",
    "갈등 상황에서 중재 역할을 할 수 있다",
    "창의적인 아이디어를 제안하는 것을 좋아한다",
    "계획을 세우고 실행하는 것을 즐긴다",
    "스트레스 상황에서도 침착하게 대처한다",
    "목표를 달성하기 위해 꾸준히 노력한다",
    "실패를 두려워하지 않고 도전한다",
    "다른 사람의 성공을 진심으로 축하한다",
    "자신의 약점을 인정하고 개선하려고 노력한다",
    "의사결정을 할 때 신중하게 생각한다",
    "시간 관리에 능숙하다",
    "새로운 기술이나 지식을 배우는 것을 좋아한다"
  ];



  const handleAnswer = (questionIndex, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const getAnswerLabel = (value) => {
    const labels = {
      1: "매우 그렇지 않다",
      2: "그렇지 않다",
      3: "약간 그렇지 않다",
      4: "보통이다",
      5: "약간 그렇다",
      6: "그렇다",
      7: "매우 그렇다"
    };
    return labels[value] || "";
  };

  const getProgressPercentage = () => {
    return (Object.keys(answers).length / questions.length) * 100;
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      // 모든 질문에 답했을 때 처리
      console.log('Test completed:', answers);
      // TestResults 페이지로 이동
      navigate('/test/results', { state: { testResults: answers } });
    } else {
      alert('모든 질문에 답해주세요.');
    }
  };

  return (
    <div className="mytest-container">
      <Topnav />
      
      <div className="mytest-content">
        <div className="mytest-header">
          <div className="header-content">
            <h1 className="mytest-title">My Test</h1>
            <button className="previous-results-btn" onClick={() => navigate('/test/database')}>
              Previous Results
            </button>
          </div>
        </div>

        {/* 진행률 표시 */}
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {Object.keys(answers).length} / {questions.length} 완료
          </p>
        </div>

        {/* 질문 섹션 */}
        <div className="questions-section">
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <h3 className="question-text">{question}</h3>
              
              {/* 7단계 응답 척도 */}
              <div className="response-scale">
                <div className="scale-labels">
                  <span className="label-left">그렇다</span>
                  <span className="label-right">그렇지 않다</span>
                </div>
                
                <div className="scale-circles">
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <button
                      key={value}
                      className={`scale-circle ${answers[index] === value ? 'selected' : ''} ${
                        value <= 3 ? 'green' : value === 4 ? 'gray' : 'purple'
                      }`}
                      onClick={() => handleAnswer(index, value)}
                      aria-label={`${getAnswerLabel(value)} 선택`}
                    >
                      {answers[index] === value && (
                        <div className="selected-indicator"></div>
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="scale-values">
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <span key={value} className="value-label">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 제출 버튼 */}
        <div className="submit-section">
          <button 
            className="submit-btn"
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTest;

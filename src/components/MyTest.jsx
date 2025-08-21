import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './Topnav';
import './MyTest.css';

const MyTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 연극 입문자 흥미 유도형 20문항 (7점 척도: 1 매우 그렇지 않다 ~ 7 매우 그렇다)
  const questions = [
    "무대에 직접 서보는 상상을 하면 설렌다",
    "대사를 외우는 연습을 꾸준히 해보고 싶다",
    "낯선 사람들과 함께 연습하는 것이 크게 부담스럽지 않다",
    "공연을 준비하는 과정(리허설·무대 설치 등)에 진한 흥미가 있다",
    "캐릭터의 감정에 몰입해 보는 활동을 즐긴다",
    "즉흥적으로 반응하고 연기하는 활동을 시도해보고 싶다",
    "발성·발음 같은 목소리 훈련에 관심이 있다",
    "몸 동작과 제스처로 감정을 표현하는 법을 배우고 싶다",
    "조연이나 단역이라도 무대에 참여할 수 있다면 기쁘다",
    "조명·음향·소품 등 백스테이지 역할에도 재미를 느낄 것 같다",
    "처음 보는 장르의 연극도 호기심을 갖고 시도하는 편이다",
    "공연을 보기만 하는 것보다 직접 참여해보는 쪽이 더 끌린다",
    "바쁜 일정 속에서도 연습 시간을 꾸준히 확보할 의지가 있다",
    "관객 앞에서 실수하더라도 경험이라 생각하고 넘어갈 수 있다",
    "다른 사람의 연기를 관찰하고 피드백을 주고받는 것이 편하다",
    "대본을 읽고 장면을 분석하는 활동이 재미있다",
    "팀워크가 필요한 상황에서 협업을 즐기는 편이다",
    "캐릭터 연구를 위해 책·영화·자료를 찾아보는 것이 즐겁다",
    "무대 의상이나 소품을 직접 만들어 보는 것을 시도해보고 싶다",
    "커뮤니티·동아리의 일원으로 꾸준히 활동하고 싶다"
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

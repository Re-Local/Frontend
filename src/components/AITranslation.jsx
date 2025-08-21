import React, { useState } from 'react';
import Topnav from './Topnav';
import './AITranslation.css';

const AITranslation = () => {
  const [userName, setUserName] = useState('User');
  const [isListening, setIsListening] = useState(false);
  const [translationResult, setTranslationResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleVoiceInput = () => {
    if (!isListening) {
      // 음성 인식 시작
      setIsListening(true);
      setIsProcessing(true);
      setTranslationResult('음성 인식 중... 말씀해 주세요.');
      
      // 실제 음성 인식 API를 여기에 연결할 수 있습니다
      // 현재는 시뮬레이션으로 3초 후 결과 표시
      setTimeout(() => {
        const sampleTexts = [
          '안녕하세요, 오늘 날씨가 정말 좋네요.',
          '저는 한국어를 공부하고 있어요.',
          '맛있는 음식을 먹고 싶어요.',
          '한국 여행을 계획하고 있어요.',
          '친구들과 만나서 이야기하고 싶어요.'
        ];
        
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        setTranslationResult(randomText);
        setIsProcessing(false);
        // setIsListening(false); // 자동으로 꺼지지 않도록 주석 처리
      }, 3000);
      
    } else {
      // 음성 인식 중지 (사용자가 버튼을 다시 눌렀을 때)
      setIsListening(false);
      setIsProcessing(false);
      setTranslationResult('음성 인식이 중지되었습니다.');
    }
  };

  const handleVoiceOutput = () => {
    if (translationResult && !isProcessing) {
      setIsSpeaking(true);
      
      // 실제 TTS API를 여기에 연결할 수 있습니다
      // 현재는 시뮬레이션으로 2초 후 완료
      setTimeout(() => {
        setIsSpeaking(false);
        // 여기에 실제 음성 출력 로직 추가
        console.log('음성 출력:', translationResult);
      }, 2000);
    }
  };

  return (
    <div className="ai-translation-container">
      <Topnav />
      
      <div className="ai-translation-content">
        <div className="ai-translation-header">
          <h1 className="ai-translation-title">AI Translation</h1>
          <p className="ai-translation-subtitle">한국어 음성을 실시간으로 번역해보세요</p>
        </div>

        <div className="translation-main">
          {/* 마스코트 캐릭터 */}
          <div className="mascot-character">
            <div className="mascot-avatar">
              <div className="mascot-face">
                <div className="mascot-eyes">
                  <div className="eye left-eye"></div>
                  <div className="eye right-eye"></div>
                </div>
                <div className="mascot-nose"></div>
                <div className="mascot-smile"></div>
              </div>
              <div className="mascot-body">
                <div className="mascot-shirt"></div>
                <div className="mascot-arms">
                  <div className="mascot-arm left-arm">
                    <div className="microphone-holder">
                      <div className="microphone-icon">🎤</div>
                    </div>
                  </div>
                  <div className="mascot-arm right-arm">
                    <div className="speaker-holder">
                      <div className="speaker-icon">🔊</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 환영 메시지 */}
          <div className="welcome-message">
            <h2 className="greeting">Hi, {userName}!</h2>
            <p className="sub-greeting">마이크로 말하고, 스피커로 들어보세요!</p>
          </div>

          {/* 음성 입력 버튼 */}
          <div className="voice-input-section">
            <button 
              className={`voice-input-btn ${isListening ? 'listening' : ''}`}
              onClick={handleVoiceInput}
              aria-label="음성 입력 시작/중지"
            >
              <div className="microphone-icon">🎤</div>
              {isListening && <div className="listening-indicator"></div>}
            </button>
            <p className="voice-hint">
              {isListening ? '음성 인식 중... 다시 눌러서 중지하세요!' : '마이크를 눌러서 음성 인식을 시작하세요'}
            </p>
          </div>

          {/* 번역 결과 표시 영역 */}
          <div className="translation-results">
            <div className="result-card">
              <h3>번역 결과</h3>
              <div className="result-content">
                {translationResult ? (
                  <p className={`result-text ${isProcessing ? 'processing' : ''}`}>
                    {translationResult}
                  </p>
                ) : (
                  <p className="placeholder-text">음성 입력 후 번역 결과가 여기에 표시됩니다</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITranslation;

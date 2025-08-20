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

  const sum = (idxList) => idxList.reduce((acc, i) => acc + (Number(testResults[i]) || 0), 0);

  const pScore = sum([0, 5, 6, 7, 8, 11]);
  const bScore = sum([9, 18]);
  const dim1 = pScore >= bScore ? 'P' : 'B';

  const iScore = sum([5, 0, 14]);
  const sScore = sum([1, 15]);
  const dim2 = iScore >= sScore ? 'I' : 'S';

  const cScore = sum([2, 15, 16, 19, 20]);
  const lScore = sum([12, 14]);
  const dim3 = cScore >= lScore ? 'C' : 'L';

  const tScore = sum([16, 18]);
  const xScore = sum([10, 11]);
  const dim4 = tScore >= xScore ? 'T' : 'X';

  const typeCode = `${dim1}${dim2}${dim3}${dim4}`;

  const typeDescription = {
    P: '무대 위에서 에너지를 얻고 표현을 즐기는 성향',
    B: '무대 뒤에서 완성도를 높이는 제작·기술 중심 성향',
    I: '유연하고 즉흥적인 상황에 강한 성향',
    S: '대본과 구조를 바탕으로 체계적으로 준비하는 성향',
    C: '협업과 팀워크를 중시하는 성향',
    L: '몰입을 위해 비교적 독립적으로 준비하는 성향',
    T: '전통적 형식과 클래식한 작품을 선호하는 성향',
    X: '새로운 형식과 실험적 무대를 선호하는 성향'
  };

  const genres = [];
  if (dim1 === 'P') genres.push('뮤지컬', '코미디 연극');
  else genres.push('창작극 스태프 참여', '테크니컬 시어터');
  if (dim4 === 'X') genres.push('실험극', '즉흥극');
  else genres.push('고전 비극', '리얼리즘 드라마');

  const plays = [];
  if (dim1 === 'P') plays.push('라이온 킹', '햄릿');
  else plays.push('스태프 워크숍 추천', '무대기술 쇼케이스');
  if (dim4 === 'X') plays.push('즉흥극 쇼케이스');
  else plays.push('오이디푸스');

  return (
    <div className="testresults-container">
      <Topnav />

      <div className="testresults-content">
        <div className="testresults-header">
          <h1 className="testresults-title">Your Theater MBTI</h1>
          <p className="testresults-subtitle">20개 문항 기반 개인 성향 분석</p>
        </div>

        <section className="type-hero">
          <div className="type-code">{typeCode}</div>
          <p className="type-desc">
            {typeDescription[dim1]} · {typeDescription[dim2]} · {typeDescription[dim3]} · {typeDescription[dim4]}
          </p>
        </section>

        <section className="recommendations">
          <h2>추천 장르</h2>
          <div className="tag-list">
            {genres.map((g, i) => (
              <span key={i} className="tag">{g}</span>
            ))}
          </div>
        </section>

        <section className="recommendations">
          <h2>추천 작품</h2>
          <div className="cards">
            {plays.map((p, i) => (
              <div key={i} className="card">{p}</div>
            ))}
          </div>
        </section>

        <div className="action-buttons">
          <button className="retake-btn" onClick={handleRetakeTest}>Retake Test</button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;

import React, { useEffect } from 'react';
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

<<<<<<< Updated upstream
  // ÌÖåÏä§Ìä∏ Í≤∞Í≥ºÎ•º Î°úÏª¨ Ïä§ÌÜ†Î¶¨ÏßÄÏóê Ï†ÄÏû•
=======
  // ≈◊Ω∫∆Æ ∞·∞˙∏¶ ∑Œƒ√ Ω∫≈‰∏Æ¡ˆø° ¿˙¿Â
>>>>>>> Stashed changes
  useEffect(() => {
    if (testResults) {
      const currentDate = new Date();
      const dateStr = currentDate.toLocaleDateString('ko-KR');
      const timeStr = currentDate.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });

<<<<<<< Updated upstream
      // Theater MBTI Î∂ÑÏÑù Î°úÏßÅ
      const sum = (idxList) => idxList.reduce((acc, i) => acc + (Number(testResults[i]) || 0), 0);

      // 1. Ï∞∏Ïó¨(P) vs Í¥ÄÏ∞∞(O) Ï∂ï - Îçî Í∑πÏ†ÅÏù∏ ÎåÄÎπÑ
      const pScore = sum([3, 8, 10, 19]); // Ïù∏ÌÑ∞ÎûôÌã∞Î∏å, ÏÜåÍ∑πÏû• ÏπúÎ∞Ä, ÏÉàÎ°úÏö¥ Î∞∞Ïö∞, ÏÜåÌÜµ
      const oScore = sum([0, 1, 11, 15]); // ÎìúÎùºÎßà/ÎπÑÍ∑π, ÏΩîÎØ∏Îîî, Ïú†Î™Ö Î∞∞Ïö∞, ÌïúÍµ≠Ï†Å Ï†ïÏÑú
      const dim1 = pScore > oScore ? 'P' : (pScore < oScore ? 'O' : (Math.random() > 0.5 ? 'P' : 'O'));

      // 2. ÌòÑÏã§(R) vs ÏÉÅÏßï(S) Ï∂ï - Í∞ÄÏ§ëÏπò Ï†ÅÏö©
      const rScore = sum([5, 7, 12, 16]) * 1.2; // ÏÇ¨ÌöåÏ†Å Î©îÏãúÏßÄ, Í∞ÅÏÉâ ÏûëÌíà, Í∞êÎèô, ÎùºÏù¥Î∏å Ïó∞Í∏∞
      const sScore = sum([2, 6, 13, 17]) * 1.1; // Ïã§ÌóòÏ†Å Ïó∞Í∑π, ÏÉÅÏßïÏ†Å ÏûëÌíà, Ï≤†ÌïôÏ†Å ÏûëÌíà, ÎåÄÏÇ¨ Ï§ëÏã¨
      const dim2 = rScore > sScore ? 'R' : (rScore < sScore ? 'S' : (Math.random() > 0.5 ? 'R' : 'S'));

      // 3. Í∞êÏÑ±(E) vs Ïù¥ÏÑ±(I) Ï∂ï - Ïó≠Î∞©Ìñ• Í∞ÄÏ§ëÏπò
      const eScore = sum([0, 4, 12, 15]) * 1.15; // ÎìúÎùºÎßà/ÎπÑÍ∑π, Î™∏Ïßì/Î¨¥Ïñ∏Í∑π, Í∞êÎèô, ÌïúÍµ≠Ï†Å Ï†ïÏÑú
      const iScore = sum([2, 6, 13, 17]) * 1.25; // Ïã§ÌóòÏ†Å Ïó∞Í∑π, ÏÉÅÏßïÏ†Å ÏûëÌíà, Ï≤†ÌïôÏ†Å ÏûëÌíà, ÎåÄÏÇ¨ Ï§ëÏã¨
      const dim3 = eScore > iScore ? 'E' : (eScore < iScore ? 'I' : (Math.random() > 0.5 ? 'E' : 'I'));

      // 4. Ï¶âÌù•(F) vs Íµ¨Ï°∞(J) Ï∂ï - Í∑πÎã®Ï†Å ÎåÄÎπÑ
      const fScore = sum([3, 4, 18, 19]) * 1.3; // Ïù∏ÌÑ∞ÎûôÌã∞Î∏å, Î™∏Ïßì/Î¨¥Ïñ∏Í∑π, ÏßßÍ≥† Í∞ÄÎ≤ºÏö¥, ÏÜåÌÜµ
      const jScore = sum([7, 8, 9, 20]) * 1.1; // Í∞ÅÏÉâ ÏûëÌíà, ÏÜåÍ∑πÏû•, ÎåÄÍ∑úÎ™® Í≥µÏó∞, ÏÑúÏÇ¨ ÍπäÏùÄ
=======
      // Theater MBTI ∫–ºÆ ∑Œ¡˜
      const sum = (idxList) => idxList.reduce((acc, i) => acc + (Number(testResults[i]) || 0), 0);

      // 1. ¬¸ø©(P) vs ∞¸¬˚(O) √‡ - ¥ı ±ÿ¿˚¿Œ ¥Î∫Ò
      const pScore = sum([3, 8, 10, 19]); // ¿Œ≈Õ∑¢∆º∫Í, º“±ÿ¿Â ƒ£π–, ªı∑ŒøÓ πËøÏ, º“≈Î
      const oScore = sum([0, 1, 11, 15]); // µÂ∂Û∏∂/∫Ò±ÿ, ƒ⁄πÃµ, ¿Ø∏Ì πËøÏ, «—±π¿˚ ¡§º≠
      const dim1 = pScore > oScore ? 'P' : (pScore < oScore ? 'O' : (Math.random() > 0.5 ? 'P' : 'O'));

      // 2. «ˆΩ«(R) vs ªÛ¬°(S) √‡ - ∞°¡ﬂƒ° ¿˚øÎ
      const rScore = sum([5, 7, 12, 16]) * 1.2; // ªÁ»∏¿˚ ∏ﬁΩ√¡ˆ, ∞¢ªˆ ¿€«∞, ∞®µø, ∂Û¿Ã∫Í ø¨±‚
      const sScore = sum([2, 6, 13, 17]) * 1.1; // Ω««Ë¿˚ ø¨±ÿ, ªÛ¬°¿˚ ¿€«∞, √∂«–¿˚ ¿€«∞, ¥ÎªÁ ¡ﬂΩ…
      const dim2 = rScore > sScore ? 'R' : (rScore < sScore ? 'S' : (Math.random() > 0.5 ? 'R' : 'S'));

      // 3. ∞®º∫(E) vs ¿Ãº∫(I) √‡ - ø™πÊ«‚ ∞°¡ﬂƒ°
      const eScore = sum([0, 4, 12, 15]) * 1.15; // µÂ∂Û∏∂/∫Ò±ÿ, ∏ˆ¡˛/π´æ±ÿ, ∞®µø, «—±π¿˚ ¡§º≠
      const iScore = sum([2, 6, 13, 17]) * 1.25; // Ω««Ë¿˚ ø¨±ÿ, ªÛ¬°¿˚ ¿€«∞, √∂«–¿˚ ¿€«∞, ¥ÎªÁ ¡ﬂΩ…
      const dim3 = eScore > iScore ? 'E' : (eScore < iScore ? 'I' : (Math.random() > 0.5 ? 'E' : 'I'));

      // 4. ¡Ô»Ô(F) vs ±∏¡∂(J) √‡ - ±ÿ¥‹¿˚ ¥Î∫Ò
      const fScore = sum([3, 4, 18, 19]) * 1.3; // ¿Œ≈Õ∑¢∆º∫Í, ∏ˆ¡˛/π´æ±ÿ, ¬™∞Ì ∞°∫≠øÓ, º“≈Î
      const jScore = sum([7, 8, 9, 20]) * 1.1; // ∞¢ªˆ ¿€«∞, º“±ÿ¿Â, ¥Î±‘∏ ∞¯ø¨, º≠ªÁ ±Ì¿∫
>>>>>>> Stashed changes
      const dim4 = fScore > jScore ? 'F' : (fScore < jScore ? 'J' : (Math.random() > 0.5 ? 'F' : 'J'));

      const typeCode = `${dim1}${dim2}${dim3}${dim4}`;

<<<<<<< Updated upstream
      // Ï†ÄÏû•Ìï† ÌÖåÏä§Ìä∏ Í≤∞Í≥º Í∞ùÏ≤¥
=======
      // ¿˙¿Â«“ ≈◊Ω∫∆Æ ∞·∞˙ ∞¥√º
>>>>>>> Stashed changes
      const testResult = {
        date: dateStr,
        time: timeStr,
        typeCode: typeCode,
        answers: testResults,
        dimensions: {
          dim1: { code: dim1, score: { p: pScore, o: oScore } },
          dim2: { code: dim2, score: { r: rScore, s: sScore } },
          dim3: { code: dim3, score: { e: eScore, i: iScore } },
          dim4: { code: dim4, score: { f: fScore, j: jScore } }
        }
      };

<<<<<<< Updated upstream
      // Í∏∞Ï°¥ Í≤∞Í≥º Î∂àÎü¨Ïò§Í∏∞
      const existingResults = JSON.parse(localStorage.getItem('theaterMBTIResults') || '[]');
      
      // ÏÉà Í≤∞Í≥º Ï∂îÍ∞Ä (ÏµúÏã† ÏàúÏúºÎ°ú Ï†ïÎ†¨)
      const updatedResults = [testResult, ...existingResults];
      
      // Î°úÏª¨ Ïä§ÌÜ†Î¶¨ÏßÄÏóê Ï†ÄÏû•
=======
      // ±‚¡∏ ∞·∞˙ ∫“∑Øø¿±‚
      const existingResults = JSON.parse(localStorage.getItem('theaterMBTIResults') || '[]');
      
      // ªı ∞·∞˙ √ﬂ∞° (√÷Ω≈ º¯¿∏∑Œ ¡§∑ƒ)
      const updatedResults = [testResult, ...existingResults];
      
      // ∑Œƒ√ Ω∫≈‰∏Æ¡ˆø° ¿˙¿Â
>>>>>>> Stashed changes
      localStorage.setItem('theaterMBTIResults', JSON.stringify(updatedResults));
    }
  }, [testResults]);

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

<<<<<<< Updated upstream
  // 1. Ï∞∏Ïó¨(P) vs Í¥ÄÏ∞∞(O) Ï∂ï - Îçî Í∑πÏ†ÅÏù∏ ÎåÄÎπÑ
  const pScore = sum([3, 8, 10, 19]); // Ïù∏ÌÑ∞ÎûôÌã∞Î∏å, ÏÜåÍ∑πÏû• ÏπúÎ∞Ä, ÏÉàÎ°úÏö¥ Î∞∞Ïö∞, ÏÜåÌÜµ
  const oScore = sum([0, 1, 11, 15]); // ÎìúÎùºÎßà/ÎπÑÍ∑π, ÏΩîÎØ∏Îîî, Ïú†Î™Ö Î∞∞Ïö∞, ÌïúÍµ≠Ï†Å Ï†ïÏÑú
  const dim1 = pScore > oScore ? 'P' : (pScore < oScore ? 'O' : (Math.random() > 0.5 ? 'P' : 'O'));

  // 2. ÌòÑÏã§(R) vs ÏÉÅÏßï(S) Ï∂ï - Í∞ÄÏ§ëÏπò Ï†ÅÏö©
  const rScore = sum([5, 7, 12, 16]) * 1.2; // ÏÇ¨ÌöåÏ†Å Î©îÏãúÏßÄ, Í∞ÅÏÉâ ÏûëÌíà, Í∞êÎèô, ÎùºÏù¥Î∏å Ïó∞Í∏∞
  const sScore = sum([2, 6, 13, 17]) * 1.1; // Ïã§ÌóòÏ†Å Ïó∞Í∑π, ÏÉÅÏßïÏ†Å ÏûëÌíà, Ï≤†ÌïôÏ†Å ÏûëÌíà, ÎåÄÏÇ¨ Ï§ëÏã¨
  const dim2 = rScore > sScore ? 'R' : (rScore < sScore ? 'S' : (Math.random() > 0.5 ? 'R' : 'S'));

  // 3. Í∞êÏÑ±(E) vs Ïù¥ÏÑ±(I) Ï∂ï - Ïó≠Î∞©Ìñ• Í∞ÄÏ§ëÏπò
  const eScore = sum([0, 4, 12, 15]) * 1.15; // ÎìúÎùºÎßà/ÎπÑÍ∑π, Î™∏Ïßì/Î¨¥Ïñ∏Í∑π, Í∞êÎèô, ÌïúÍµ≠Ï†Å Ï†ïÏÑú
  const iScore = sum([2, 6, 13, 17]) * 1.25; // Ïã§ÌóòÏ†Å Ïó∞Í∑π, ÏÉÅÏßïÏ†Å ÏûëÌíà, Ï≤†ÌïôÏ†Å ÏûëÌíà, ÎåÄÏÇ¨ Ï§ëÏã¨
  const dim3 = eScore > iScore ? 'E' : (eScore < iScore ? 'I' : (Math.random() > 0.5 ? 'E' : 'I'));

  // 4. Ï¶âÌù•(F) vs Íµ¨Ï°∞(J) Ï∂ï - Í∑πÎã®Ï†Å ÎåÄÎπÑ
  const fScore = sum([3, 4, 18, 19]) * 1.3; // Ïù∏ÌÑ∞ÎûôÌã∞Î∏å, Î™∏Ïßì/Î¨¥Ïñ∏Í∑π, ÏßßÍ≥† Í∞ÄÎ≤ºÏö¥, ÏÜåÌÜµ
  const jScore = sum([7, 8, 9, 20]) * 1.1; // Í∞ÅÏÉâ ÏûëÌíà, ÏÜåÍ∑πÏû•, ÎåÄÍ∑úÎ™® Í≥µÏó∞, ÏÑúÏÇ¨ ÍπäÏùÄ
=======
  // 1. ¬¸ø©(P) vs ∞¸¬˚(O) √‡ - ¥ı ±ÿ¿˚¿Œ ¥Î∫Ò
  const pScore = sum([3, 8, 10, 19]); // ¿Œ≈Õ∑¢∆º∫Í, º“±ÿ¿Â ƒ£π–, ªı∑ŒøÓ πËøÏ, º“≈Î
  const oScore = sum([0, 1, 11, 15]); // µÂ∂Û∏∂/∫Ò±ÿ, ƒ⁄πÃµ, ¿Ø∏Ì πËøÏ, «—±π¿˚ ¡§º≠
  const dim1 = pScore > oScore ? 'P' : (pScore < oScore ? 'O' : (Math.random() > 0.5 ? 'P' : 'O'));

  // 2. «ˆΩ«(R) vs ªÛ¬°(S) √‡ - ∞°¡ﬂƒ° ¿˚øÎ
  const rScore = sum([5, 7, 12, 16]) * 1.2; // ªÁ»∏¿˚ ∏ﬁΩ√¡ˆ, ∞¢ªˆ ¿€«∞, ∞®µø, ∂Û¿Ã∫Í ø¨±‚
  const sScore = sum([2, 6, 13, 17]) * 1.1; // Ω««Ë¿˚ ø¨±ÿ, ªÛ¬°¿˚ ¿€«∞, √∂«–¿˚ ¿€«∞, ¥ÎªÁ ¡ﬂΩ…
  const dim2 = rScore > sScore ? 'R' : (rScore < sScore ? 'S' : (Math.random() > 0.5 ? 'R' : 'S'));

  // 3. ∞®º∫(E) vs ¿Ãº∫(I) √‡ - ø™πÊ«‚ ∞°¡ﬂƒ°
  const eScore = sum([0, 4, 12, 15]) * 1.15; // µÂ∂Û∏∂/∫Ò±ÿ, ∏ˆ¡˛/π´æ±ÿ, ∞®µø, «—±π¿˚ ¡§º≠
  const iScore = sum([2, 6, 13, 17]) * 1.25; // Ω««Ë¿˚ ø¨±ÿ, ªÛ¬°¿˚ ¿€«∞, √∂«–¿˚ ¿€«∞, ¥ÎªÁ ¡ﬂΩ…
  const dim3 = eScore > iScore ? 'E' : (eScore < iScore ? 'I' : (Math.random() > 0.5 ? 'E' : 'I'));

  // 4. ¡Ô»Ô(F) vs ±∏¡∂(J) √‡ - ±ÿ¥‹¿˚ ¥Î∫Ò
  const fScore = sum([3, 4, 18, 19]) * 1.3; // ¿Œ≈Õ∑¢∆º∫Í, ∏ˆ¡˛/π´æ±ÿ, ¬™∞Ì ∞°∫≠øÓ, º“≈Î
  const jScore = sum([7, 8, 9, 20]) * 1.1; // ∞¢ªˆ ¿€«∞, º“±ÿ¿Â, ¥Î±‘∏ ∞¯ø¨, º≠ªÁ ±Ì¿∫
>>>>>>> Stashed changes
  const dim4 = fScore > jScore ? 'F' : (fScore < jScore ? 'J' : (Math.random() > 0.5 ? 'F' : 'J'));

  const typeCode = `${dim1}${dim2}${dim3}${dim4}`;

  const typeDescription = {
<<<<<<< Updated upstream
    P: 'ÏßÅÏ†ë Ï∞∏Ïó¨ÌïòÍ≥† ÏÜåÌÜµÌïòÎäî Í≤ÉÏùÑ Ï¶êÍ∏∞Îäî ÏÑ±Ìñ•',
    O: 'Í¥ÄÍ∞ùÏúºÎ°úÏÑú ÏûëÌíàÏùÑ Í¥ÄÏ∞∞ÌïòÍ≥† Í∞êÏÉÅÌïòÎäî ÏÑ±Ìñ•',
    R: 'ÌòÑÏã§Ï†ÅÏù¥Í≥† Íµ¨Ï≤¥Ï†ÅÏù∏ Î©îÏãúÏßÄÎ•º ÏÑ†Ìò∏ÌïòÎäî ÏÑ±Ìñ•',
    S: 'ÏÉÅÏßïÏ†ÅÏù¥Í≥† Ìï¥ÏÑùÏù¥ ÌïÑÏöîÌïú ÏûëÌíàÏùÑ Ï¶êÍ∏∞Îäî ÏÑ±Ìñ•',
    E: 'Í∞êÏ†ïÏ†Å Î™∞ÏûÖÍ≥º ÏßÅÍ¥ÄÏ†Å Í∞êÏÉÅÏùÑ ÏÑ†Ìò∏ÌïòÎäî ÏÑ±Ìñ•',
    I: 'Ïù¥ÏÑ±Ï†Å Î∂ÑÏÑùÍ≥º ÏÇ¨Í≥†Î•º ÏûêÍ∑πÌïòÎäî ÏûëÌíàÏùÑ ÏÑ†Ìò∏ÌïòÎäî ÏÑ±Ìñ•',
    F: 'Ï¶âÌù•Ï†ÅÏù¥Í≥† ÏûêÏú†Î°úÏö¥ ÌòïÏãùÏùÑ Ï¶êÍ∏∞Îäî ÏÑ±Ìñ•',
    J: 'Íµ¨Ï°∞Ï†ÅÏù¥Í≥† Ï≤¥Í≥ÑÏ†ÅÏù∏ ÏûëÌíà Íµ¨ÏÑ±ÏùÑ ÏÑ†Ìò∏ÌïòÎäî ÏÑ±Ìñ•'
  };

  const genres = [];
  if (dim1 === 'P') genres.push('Ïù∏ÌÑ∞ÎûôÌã∞Î∏å Ïó∞Í∑π', 'Ï∞∏Ïó¨Ìòï Í≥µÏó∞');
  else genres.push('Ï†ÑÌÜµ Ïó∞Í∑π', 'ÌÅ¥ÎûòÏãù ÏûëÌíà');
  if (dim2 === 'R') genres.push('ÏÇ¨ÌöåÍ∑π', 'Î¶¨ÏñºÎ¶¨Ï¶ò ÎìúÎùºÎßà');
  else genres.push('Ïã§ÌóòÍ∑π', 'ÏÉÅÏßïÍ∑π');
  if (dim3 === 'E') genres.push('Í∞êÎèô ÎìúÎùºÎßà', 'ÎπÑÍ∑π');
  else genres.push('Ï≤†ÌïôÍ∑π', 'ÏÇ¨Í≥†Í∑π');
  if (dim4 === 'F') genres.push('Ï¶âÌù•Í∑π', 'ÏûêÏú†Í∑π');
  else genres.push('Íµ¨Ï°∞Í∑π', 'ÏÑúÏÇ¨Í∑π');

  const plays = [];
  if (dim1 === 'P') plays.push('Ïù∏ÌÑ∞ÎûôÌã∞Î∏å Ïáº', 'Ï∞∏Ïó¨Ìòï ÏõåÌÅ¨Ïàç');
  else plays.push('ÌñÑÎ¶ø', 'Ïò§Ïù¥ÎîîÌë∏Ïä§');
  if (dim2 === 'R') plays.push('ÏÇ¨Ìöå Î¨∏Ï†úÍ∑π', 'ÌòÑÏã§ ÎìúÎùºÎßà');
  else plays.push('ÏÉÅÏßïÍ∑π', 'Ïã§Ìóò ÏûëÌíà');
  if (dim3 === 'E') plays.push('Í∞êÎèô ÎπÑÍ∑π', 'Í∞êÏ†ï ÎìúÎùºÎßà');
  else plays.push('Ï≤†ÌïôÏ†Å ÏûëÌíà', 'ÏÇ¨Í≥† ÏûêÍ∑πÍ∑π');
  if (dim4 === 'F') plays.push('Ï¶âÌù•Í∑π Ïáº', 'ÏûêÏú† ÌòïÏãùÍ∑π');
  else plays.push('ÏÑúÏÇ¨Í∑π', 'Íµ¨Ï°∞Ï†Å ÏûëÌíà');
=======
    P: '¡˜¡¢ ¬¸ø©«œ∞Ì º“≈Î«œ¥¬ ∞Õ¿ª ¡Ò±‚¥¬ º∫«‚',
    O: '∞¸∞¥¿∏∑Œº≠ ¿€«∞¿ª ∞¸¬˚«œ∞Ì ∞®ªÛ«œ¥¬ º∫«‚',
    R: '«ˆΩ«¿˚¿Ã∞Ì ±∏√º¿˚¿Œ ∏ﬁΩ√¡ˆ∏¶ º±»£«œ¥¬ º∫«‚',
    S: 'ªÛ¬°¿˚¿Ã∞Ì «ÿºÆ¿Ã « ø‰«— ¿€«∞¿ª ¡Ò±‚¥¬ º∫«‚',
    E: '∞®¡§¿˚ ∏Ù¿‘∞˙ ¡˜∞¸¿˚ ∞®ªÛ¿ª º±»£«œ¥¬ º∫«‚',
    I: '¿Ãº∫¿˚ ∫–ºÆ∞˙ ªÁ∞Ì∏¶ ¿⁄±ÿ«œ¥¬ ¿€«∞¿ª º±»£«œ¥¬ º∫«‚',
    F: '¡Ô»Ô¿˚¿Ã∞Ì ¿⁄¿Ø∑ŒøÓ «¸Ωƒ¿ª ¡Ò±‚¥¬ º∫«‚',
    J: '±∏¡∂¿˚¿Ã∞Ì √º∞Ë¿˚¿Œ ¿€«∞ ±∏º∫¿ª º±»£«œ¥¬ º∫«‚'
  };

  const genres = [];
  if (dim1 === 'P') genres.push('¿Œ≈Õ∑¢∆º∫Í ø¨±ÿ', '¬¸ø©«¸ ∞¯ø¨');
  else genres.push('¿¸≈Î ø¨±ÿ', '≈¨∑°Ωƒ ¿€«∞');
  if (dim2 === 'R') genres.push('ªÁ»∏±ÿ', '∏ÆæÛ∏Æ¡Ú µÂ∂Û∏∂');
  else genres.push('Ω««Ë±ÿ', 'ªÛ¬°±ÿ');
  if (dim3 === 'E') genres.push('∞®µø µÂ∂Û∏∂', '∫Ò±ÿ');
  else genres.push('√∂«–±ÿ', 'ªÁ∞Ì±ÿ');
  if (dim4 === 'F') genres.push('¡Ô»Ô±ÿ', '¿⁄¿Ø±ÿ');
  else genres.push('±∏¡∂±ÿ', 'º≠ªÁ±ÿ');

  const plays = [];
  if (dim1 === 'P') plays.push('¿Œ≈Õ∑¢∆º∫Í ºÓ', '¬¸ø©«¸ øˆ≈©ºÛ');
  else plays.push('«‹∏¥', 'ø¿¿Ãµ«™Ω∫');
  if (dim2 === 'R') plays.push('ªÁ»∏ πÆ¡¶±ÿ', '«ˆΩ« µÂ∂Û∏∂');
  else plays.push('ªÛ¬°±ÿ', 'Ω««Ë ¿€«∞');
  if (dim3 === 'E') plays.push('∞®µø ∫Ò±ÿ', '∞®¡§ µÂ∂Û∏∂');
  else plays.push('√∂«–¿˚ ¿€«∞', 'ªÁ∞Ì ¿⁄±ÿ±ÿ');
  if (dim4 === 'F') plays.push('¡Ô»Ô±ÿ ºÓ', '¿⁄¿Ø «¸Ωƒ±ÿ');
  else plays.push('º≠ªÁ±ÿ', '±∏¡∂¿˚ ¿€«∞');
>>>>>>> Stashed changes

  return (
    <div className="testresults-container">
      <Topnav />
<<<<<<< Updated upstream
      <div style={{ textAlign: 'center', margin: '20px 0', color: '#FFD700', fontSize: '1.5rem', fontWeight: 'bold' }}>Ï°∞Ïû¨ÌòÑ</div>
=======
      <div style={{ textAlign: 'center', margin: '20px 0', color: '#FFD700', fontSize: '1.5rem', fontWeight: 'bold' }}>¡∂¿Á«ˆ</div>
>>>>>>> Stashed changes

      <div className="testresults-content">
        <div className="testresults-header">
          <h1 className="testresults-title">Your Theater MBTI</h1>
<<<<<<< Updated upstream
          <p className="testresults-subtitle">20Í∞ú Î¨∏Ìï≠ Í∏∞Î∞ò Í∞úÏù∏ ÏÑ±Ìñ• Î∂ÑÏÑù</p>
=======
          <p className="testresults-subtitle">20∞≥ πÆ«◊ ±‚π› ∞≥¿Œ º∫«‚ ∫–ºÆ</p>
>>>>>>> Stashed changes
        </div>

        <section className="type-hero">
          <div className="type-code">{typeCode}</div>
          <p className="type-desc">
<<<<<<< Updated upstream
            {typeDescription[dim1]} ¬∑ {typeDescription[dim2]} ¬∑ {typeDescription[dim3]} ¬∑ {typeDescription[dim4]}
=======
            {typeDescription[dim1]} °§ {typeDescription[dim2]} °§ {typeDescription[dim3]} °§ {typeDescription[dim4]}
>>>>>>> Stashed changes
          </p>
        </section>

        <section className="recommendations">
<<<<<<< Updated upstream
          <h2>Ï∂îÏ≤ú Ïû•Î•¥</h2>
=======
          <h2>√ﬂ√µ ¿Â∏£</h2>
>>>>>>> Stashed changes
          <div className="tag-list">
            {genres.map((g, i) => (
              <span key={i} className="tag">{g}</span>
            ))}
          </div>
        </section>

        <section className="recommendations">
<<<<<<< Updated upstream
          <h2>Ï∂îÏ≤ú ÏûëÌíà</h2>
=======
          <h2>√ﬂ√µ ¿€«∞</h2>
>>>>>>> Stashed changes
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
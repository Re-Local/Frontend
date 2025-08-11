import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';   // ✅ 성공 후 이동
import axios from 'axios';                        // ✅ 서버 전송
import './Signup.css';

const COUNTRIES = ['Korea','USA','Japan','China','Germany','France','Canada','UK','Spain','Australia'];
const LANGUAGES = ['Korean','English','Japanese','Chinese','German','French','Spanish','Portuguese','Russian','Arabic'];

export default function Signup() {
  // 직접 입력
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');      // "0" | "1"
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  // 토글
  const [country, setCountry] = useState('Korea');
  const [language, setLanguage] = useState('Korean');

  // 문자열 입력
  const [interestTag, setInterestTag] = useState('');

  // UX
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const isInt = (v) => /^\d+$/.test(String(v));
  const isValidGender = gender === '0' || gender === '1';

  const canSubmit =
    name.trim() &&
    userid.trim() &&
    password &&
    isValidGender &&
    isInt(age) &&
    country &&
    language &&
    interestTag.trim() &&
    !loading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      name: name.trim(),
      gender: Number(gender),      // 0 or 1
      userid: userid.trim(),
      password,                    // ⚠️ 실제 서비스는 서버에서 해싱/솔트 처리
      country,
      language,
      age: parseInt(age, 10),
      interestTag: interestTag.trim(),
    };

    try {
      setLoading(true);
      setErrMsg('');

      // 🔧 백엔드 회원가입 API URL로 바꿔주세요.
      // 예: http://localhost:8080/api/auth/signup  또는  http://localhost:5000/api/signup
      const res = await axios.post('https://re-local.onrender.com/api/users/signup', payload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false, // 쿠키 쓰면 true
      });

      console.log('서버 응답:', res.data);
      alert('회원가입이 완료되었습니다!');
      navigate('/login'); // ✅ 완료 후 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      setErrMsg(
        err.response?.data?.message ||
        '회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrap">
      <h2>회원가입</h2>

      <form className="signup-form" onSubmit={onSubmit}>
        {errMsg && (
          <div style={{ color: '#b91c1c', marginBottom: 8, fontSize: 14 }}>
            {errMsg}
          </div>
        )}

        {/* 이름 */}
        <label>
          이름
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* 아이디 */}
        <label>
          아이디
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            autoComplete="username"
          />
        </label>

        {/* 비밀번호 */}
        <label>
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>

        {/* 성별: 0/1 */}
        <label>
          성별 (남자: 0, 여자: 1)
          <input
            type="number"
            placeholder="예: 0 또는 1"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            min="0"
            max="1"
          />
        </label>

        {/* 국가 토글 */}
        <div className="field">
          <span className="field-label">국가</span>
          <div className="toggle-group">
            {COUNTRIES.map((c) => (
              <button
                type="button"
                key={c}
                className={`toggle ${country === c ? 'active' : ''}`}
                onClick={() => setCountry(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 언어 토글 */}
        <div className="field">
          <span className="field-label">언어</span>
          <div className="toggle-group">
            {LANGUAGES.map((l) => (
              <button
                type="button"
                key={l}
                className={`toggle ${language === l ? 'active' : ''}`}
                onClick={() => setLanguage(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* 나이 */}
        <label>
          나이
          <input
            type="number"
            placeholder="예: 23"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="0"
          />
        </label>

        {/* 관심 태그 */}
        <label>
          관심 태그
          <input
            type="text"
            placeholder="예: K-pop, Food, Museum"
            value={interestTag}
            onChange={(e) => setInterestTag(e.target.value)}
          />
        </label>

        <button className="submit" type="submit" disabled={!canSubmit}>
          {loading ? '처리 중…' : '회원가입'}
        </button>
      </form>
    </div>
  );
}

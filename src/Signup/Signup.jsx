
import React, { useState } from 'react';
import './Signup.css';

const COUNTRIES = ['Korea','USA','Japan','China','Germany','France','Canada','UK','Spain','Australia'];
const LANGUAGES = ['Korean','English','Japanese','Chinese','German','French','Spanish','Portuguese','Russian','Arabic'];
const TAGS = ['스포츠', '음악', '여행', '요리', '독서', '영화', '게임', '사진', '운동', '학습'];

export default function Signup() {
  // 직접 입력 필드
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');      // "0" or "1" 입력
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [tags, setTags] = useState([]);

  // 토글 선택 필드
  const [country, setCountry] = useState('Korea');
  const [language, setLanguage] = useState('Korean');

  const toggle = (list, setter, value) =>
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

  const isInt = (value) => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num.toString() === value;
  };

  const canSubmit = 
    name.trim() &&
    userid.trim() &&
    password &&
    (gender === '0' || gender === '1') &&
    isInt(age) &&
    country &&
    language &&
    tags.length > 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = {
      name: name.trim(),
      gender: Number(gender),                 // 0 or 1
      userid: userid.trim(),
      password,                               // 실제 서비스에선 해싱 필요!
      country,
      language,
      age: parseInt(age, 10),
      tags
    };

    console.log('signup payload:', payload);
    alert('회원가입 데이터가 콘솔에 출력되었습니다.');
    // TODO: fetch/axios POST로 서버에 전송
  };

  return (
    <div className="signup-wrap">
      <h2>회원가입</h2>

      <form className="signup-form" onSubmit={onSubmit}>
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

        {/* 성별: 0/1 직접 입력 */}
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

        {/* 언어 토글 (단일 선택) */}
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

        {/* 나이 직접 입력 */}
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

        <div className="field">
          <span className="field-label">관심 태그</span>
          <div className="chip-group">
            {TAGS.map(t => (
              <button
                type="button"
                key={t}
                className={`chip ${tags.includes(t) ? 'selected' : ''}`}
                onClick={() => toggle(tags, setTags, t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button className="submit" type="submit" disabled={!canSubmit}>
          회원가입
        </button>
      </form>
    </div>
  );
}
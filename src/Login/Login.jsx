import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert(`아이디: ${id}\n비밀번호: ${password}`);
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

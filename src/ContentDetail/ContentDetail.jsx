// ContentDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ContentDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>能刨明 惑技 其捞瘤</h1>
      <p>能刨明 ID: {id}</p>
      {/* 咯扁俊 惑技 沥焊 坊歹傅 */}
    </div>
  );
}
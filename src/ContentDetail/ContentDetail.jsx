// ContentDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function ContentDetail() {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>������ �� ������</h1>
      <p>������ ID: {id}</p>
      {/* ���⿡ �� ���� ������ */}
    </div>
  );
}
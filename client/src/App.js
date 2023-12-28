// App.js
import React from 'react';
import ImageButton from './components/ImageButton/ImageButton.js';
import './App.css'; // 스타일링을 위한 CSS 파일 import
import Header from './components/Header/Header.js';
import Logo from './components/Logo/Logo.js';

const App = () => {
  return (
    <div className="app-container">
      <Logo></Logo>
      <div className='Header-Box'>
        <Header></Header>
      </div>
      <ImageButton></ImageButton>
      <div className='button-divider'></div>
    </div>
  );
}

export default App;

// App.js
import React from 'react';
// eslint-disable-next-line no-unused-vars
import ImageButton from './components/ImageButton/ImageButton.js';
import './App.css'; // 스타일링을 위한 CSS 파일 import
import Header from './components/Header/Header.js';
import Logo from './components/Logo/Logo.js';
// eslint-disable-next-line no-unused-vars
import RoundButton from './components/RoundButton/RoundButton.js';
import Screen from './components/Screen/Screen.js';

const App = () => {
  return (
    <div className="app-container">
      <Logo></Logo>
      <div className='Header-Box'>
        <Header></Header>
      </div>
      <Screen></Screen>
    </div>
  );
}

export default App;

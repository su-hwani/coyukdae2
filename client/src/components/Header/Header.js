// Header.js
import React from 'react';
import './Header.css'
import { SlPresent } from "react-icons/sl";

const Header = () => {
  return (
    <header className='header'>
        <SlPresent className="tree-icon" size="50px"></SlPresent>
        <h1 className='header-title'>크리스마스 선물 고르기</h1>
        <SlPresent className="tree-icon" size="50px"></SlPresent>
    </header>
  );
};

export default Header;

// Header.js
import React from 'react';
import './Header.css'
import { SlPresent } from "react-icons/sl";

const Header = () => {
  return (
    <header className='header'>
        <SlPresent className="tree-icon" size="40px"></SlPresent>
        <div className='header-title'>Choose one you like the Most</div>
        <SlPresent className="tree-icon" size="40px"></SlPresent>
    </header>
  );
};

export default Header;

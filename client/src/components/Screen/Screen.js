import React, { useState } from 'react';
import ImageButton from '../ImageButton/ImageButton';
import RoundButton from '../RoundButton/RoundButton.js';
import "./Screen.css"
import ResultScreen from '../ResultScreen/ResultScreen';

const Screen = () => {
  const [showImageButton, setShowImageButton] = useState(false);
  const [showRoundButton, setShowRoundButton] = useState(true);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [clickCount, setClickCount] = useState(-1);
  const [showRoundIndex, setShowRoundIndex] = useState(0);

  const handleButtonClick = () => {
    if (clickCount < 35){
      setClickCount((prevCount) => prevCount + 1);
      setShowRoundButton(clickCount === -1 || clickCount === 16 || clickCount === 25 || clickCount === 30 || clickCount === 33 || clickCount === 35);
      setShowImageButton(!(clickCount === -1 || clickCount === 16 || clickCount === 25 || clickCount === 30 || clickCount === 33 || clickCount === 35));
      if (showRoundButton) {
        setShowRoundIndex((prevCount) => prevCount + 1);
      }
    } else { 
      setShowImageButton(false)
      setShowRoundButton(false)
      setShowResultScreen(true)
    }
  };

  return (
    <div>
      {showRoundButton && <RoundButton onClick={handleButtonClick} showRoundIndex={showRoundIndex} />}
      {showImageButton && <ImageButton onClick={handleButtonClick} />}
      {showResultScreen && <ResultScreen/>}
    </div>
  );
};

export default Screen;
import React, { useState } from 'react';
import ImageButton from '../ImageButton/ImageButton';
import RoundButton from '../RoundButton/RoundButton.js';
import "./Screen.css"

const Screen = () => {
  const [showImageButton, setShowImageButton] = useState(false);
  const [showRoundButton, setShowRoundButton] = useState(true);
  const [clickCount, setClickCount] = useState(-1);
  const [showRoundIndex, setShowRoundIndex] = useState(0);

  const handleButtonClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    setShowRoundButton(clickCount === -1 || clickCount === 16 || clickCount === 24 || clickCount === 28 || clickCount === 30 || clickCount === 31);
    setShowImageButton(!(clickCount === -1 || clickCount === 16 || clickCount === 24 || clickCount === 28 || clickCount === 30 || clickCount === 31));
    if (showRoundButton) {
      setShowRoundIndex((prevCount) => prevCount + 1);
    }
  };

  return (
    <div>
      {showRoundButton && <RoundButton onClick={handleButtonClick} showRoundIndex={showRoundIndex} />}
      {showImageButton && <ImageButton onClick={handleButtonClick} />}
    </div>
  );
};

export default Screen;
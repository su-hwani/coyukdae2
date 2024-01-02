// Logo.js
import React, { useState } from 'react';
import ImageButton from '../ImageButton/ImageButton';
import './RoundButton.css'

const RoundButton = ( props ) => {
  const receivedOnClick = props.onClick;
  const receivedShowRoundIndex = props.showRoundIndex;

  const buttonTextList = ['START', '- 32강 -', '- 16강 -', '- 8강 -', '- 4강 -', '* 결승 *'];
  const [buttonIndex, setButtonIndex] = useState(0);

  // 버튼 클릭 시 호출되는 함수
  const handleButtonClick = () => {
    // 버튼 텍스트를 리스트에서 가져와 업데이트합니다.
    setButtonIndex((prevIndex) => (prevIndex + 1) % buttonTextList.length);
    receivedOnClick(); // 상위 컴포넌트의 handleClick 함수 호출
  };

  return (
    <button className="Round-Button-container" onClick={handleButtonClick}>
      <div className="Round-Text-container" style={{ width: '800px', height: '450px', backgroundColor: 'lightblue' }}>
        <div className="Round-Text">
          {buttonTextList[receivedShowRoundIndex]}
        </div>
      </div>
    </button>
  );
};

export default RoundButton;
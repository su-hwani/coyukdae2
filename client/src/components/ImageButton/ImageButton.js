import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageButton.css'
import { FaComputer } from "react-icons/fa6";

const ImageButton = () => {
  const [imageInfo, setImageInfo] = useState({
    imageUrl: '',
    imageName: ''
  });

  useEffect(() => {
    // 서버에서 이미지 정보를 비동기로 받아옴
    axios.get('http://localhost:8080/ImageButton/get')
      .then(response => {
        setImageInfo({
          imageUrl: response.data.IMAGEURL,
          imageName: response.data.IMAGENAME
        });
      })
      .catch(error => {
        console.error('Error fetching image info:', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 함

  const handleClick = () => {
    // 클릭할 때마다 imageName을 현재 시간 기준으로 업데이트
    setImageInfo(prevState => ({
      ...prevState,
      imageName: `49`
    }));
  };

  return (
    <div>
        <div className="container">
          <button onClick={handleClick} className="button-container">
            {imageInfo.imageUrl && (
              <div className='image-container'>
                <FaComputer style={{ width: '250px', height: '250px' }}></FaComputer>
                {imageInfo.imageName && <div className="image-name">{imageInfo.imageName}</div>}
              </div>
            )}
          </button>
          <div className='button-gap'></div>
          <button onClick={handleClick} className="button-container">
            {imageInfo.imageUrl && (
              <div className='image-container'>
                {/* <img
                  src='http://kdsoa.co.kr/data/item/1686201662/thumb-6re466a81_700x700.png'
                  alt={imageInfo.imageName}
                  style={{ width: '400px', height: '400px' }}
                /> */}
                <FaComputer style={{ width: '250px', height: '250px' }}></FaComputer>
                {imageInfo.imageName && <div className="image-name">{imageInfo.imageName}</div>}
              </div>
            )}
          </button>
        </div>
    </div>
  );
};

export default ImageButton;

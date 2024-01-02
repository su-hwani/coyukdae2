import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ImageButton.css'
import * as ReactIcons from "react-icons/fa6";
import getImageAll from '../../api/getImageAll';
import RoundButton from '../RoundButton/RoundButton';

const ImageButton = ({ onClick }) => {

  const [imageAllInfo, storeImageInfo] = useState([{
    IMAGEURL: 'https://cdn-pro-web-223-42.cdn-nhncommerce.com/auroraworld1_godomall_com/data/goods/19/10/42//1000004381/1000004381_add1_061.jpg',
    IMAGENAME: 'test1',
    IMAGEID: 0,
  }]);

  const selectedImageIdRef = useRef([]);

  const imageIdRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getImageAll();
        storeImageInfo(response);
        
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleClick = async (newSelectedImageId) => {

    const currentSelectedImageId = selectedImageIdRef.current 
    currentSelectedImageId.push(newSelectedImageId)
    selectedImageIdRef.current = currentSelectedImageId
    console.log(selectedImageIdRef)
    onClick();
    const nextImageId = imageIdRef.current + 2;
    imageIdRef.current = nextImageId;
    
    if (nextImageId > imageAllInfo.length) {
      console.error('Invalid imageId or no more images to update.');
    } else if (nextImageId === imageAllInfo.length) {
      console.log("ASD")
    }
  };

  return (
    <div>
      <div>
        <div className='image-container-title'> What is the better </div>
        <div className="container">
          <button onClick={() => handleClick(imageIdRef.current)} className="button-container">
            {imageAllInfo[imageIdRef.current] && (
              <div className='image-container'>
                <img className='image'
                  src={imageAllInfo[imageIdRef.current].IMAGEURL}
                  alt={imageAllInfo[imageIdRef.current].IMAGENAME}
                  style={{ width: '300px', height: '250px' }}
                />
                {imageAllInfo[imageIdRef.current].IMAGENAME && <div className="image-name">{imageAllInfo[imageIdRef.current].IMAGENAME}</div>}
              </div>
            )}
          </button>
          <div className='button-gap'></div>
          <button onClick={() => handleClick(imageIdRef.current+1)} className="button-container">
            {imageAllInfo[imageIdRef.current + 1] && (
              <div className='image-container'>
                <img className='image'
                  src={imageAllInfo[imageIdRef.current + 1].IMAGEURL}
                  alt={imageAllInfo[imageIdRef.current + 1].IMAGENAME}
                  style={{ width: '300px', height: '250px' }}
                />
                {imageAllInfo[imageIdRef.current + 1].IMAGENAME && <div className="image-name">{imageAllInfo[imageIdRef.current + 1].IMAGENAME}</div>}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
  
};


export default ImageButton;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ImageButton.css'
import * as ReactIcons from "react-icons/fa6";
import getImageAll from '../../api/getImageAll';
import RoundButton from '../RoundButton/RoundButton';
import storeSelectedImage from '../../api/storeSelectedImage';
import Chuu from "../../images/Chuu.jpeg"

const ImageButton = ({ onClick }) => {

  const [imageAllInfo, storeImageInfo] = useState([{
    IMAGEURL: '',
    IMAGENAME: '',
    IMAGEID: 0,
  }]);
  const [importLeftImageModule, storeImportLeftImageModule] = useState(null);
  const [importRightImageModule, storeImportRightImageModule] = useState(null);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const initialArray = Array.from({ length: 32 }, (_, index) => index);
  const [displayImageInfo, setDisplayImageInfo] = useState(shuffleArray(initialArray));

  const selectedImageIdRef = useRef([]);
  const roundRef = useRef(32);
  const imageIdRef = useRef(0);
  
  useEffect(() => {

    const fetchImageAllInfo = async () => {
      try {
        const response = await getImageAll();
        storeImageInfo(response);
        
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDisplayImageInfo = async () => {
      try { 
        const cookieString = document.cookie;
        const cookieArray = cookieString.split('; ');
        for (const cookie of cookieArray) {
          const [name, value] = cookie.split('=');
        
          if (name === 'round') {
            const parsedValue = JSON.parse(value);
            roundRef.current = parsedValue
            break;
          }
        }
        if (roundRef.current !== 32){
          for (const cookie of cookieArray) {
            const [name, value] = cookie.split('=');
          
            if (name === 'selectedImageIdArray') {
              const parsedValue = JSON.parse(value);
              setDisplayImageInfo(shuffleArray(parsedValue));
              break;
            }
          }
        } else {
          setDisplayImageInfo(shuffleArray(displayImageInfo))
        }
      } catch (error) { 
        console.log(error);
      }
    }

    fetchImageAllInfo();
    fetchDisplayImageInfo();
  }, []);

  useEffect(() => {
    const importImage = async () => {
      try {
        const leftImageModule = await import(`../../images/${imageAllInfo[displayImageInfo[imageIdRef.current]].IMAGEURL}.jpeg`);
        const rightImageModule = await import(`../../images/${imageAllInfo[displayImageInfo[imageIdRef.current+1]].IMAGEURL}.jpeg`);
        storeImportLeftImageModule(leftImageModule.default);
        storeImportRightImageModule(rightImageModule.default)
      } catch (err) {
        console.log(err)
      }
    }
    importImage();
  }, [displayImageInfo, imageAllInfo, imageIdRef.current])

  
  const handleClick = async (newSelectedImageId) => {
    newSelectedImageId -= 1
    const currentSelectedImageId = selectedImageIdRef.current 
    currentSelectedImageId.push(newSelectedImageId)
    selectedImageIdRef.current = currentSelectedImageId
    
    onClick();
    
    const nextImageId = imageIdRef.current + 2;
    imageIdRef.current = nextImageId;
    if (nextImageId > displayImageInfo.length) {
      console.error('Invalid imageId or no more images to update.');

    } else if (nextImageId === displayImageInfo.length) {

      switch (selectedImageIdRef.current.length) {
        case 16:
          roundRef.current = 16
          break;
        case 8:
          roundRef.current = 8
          break;
        case 4:
          roundRef.current = 4
          break;
        case 2:
          roundRef.current = 2
          break;
        case 1:
        roundRef.current = 1
        document.cookie = `resultImageUrl=${encodeURIComponent(imageAllInfo[newSelectedImageId].IMAGEURL)}`;
        document.cookie = `resultImageName=${encodeURIComponent(imageAllInfo[newSelectedImageId].IMAGENAME)}`;
        break;
        default:
          // roundRef.current가 위의 case에 해당하지 않을 때 수행할 동작
          console.log('Default case');
          break;
      }
      const response = await storeSelectedImage(selectedImageIdRef);
      document.cookie = `selectedImageIdArray=${JSON.stringify(selectedImageIdRef.current)}`;
      document.cookie = `round=${JSON.stringify(roundRef.current)}`;
      selectedImageIdRef.current = []
    }
  }; 

  return (
    <div>
      <div>
        <div className='image-container-title'>Who is better ? </div>
        <div className="container">
          <button onClick={() => handleClick(imageAllInfo[displayImageInfo[imageIdRef.current]].ID)} className="button-container">
            {imageAllInfo[displayImageInfo[imageIdRef.current]] && (
              <div className='image-container'>
                <img className='image'
                  src={importLeftImageModule}
                  alt={imageAllInfo[displayImageInfo[imageIdRef.current]].IMAGENAME}
                  style={{ width: '300px', height: '250px' }}
                />
                {imageAllInfo[displayImageInfo[imageIdRef.current]].IMAGENAME && <div className="image-name">{imageAllInfo[displayImageInfo[imageIdRef.current]].IMAGENAME}</div>}
              </div>
            )}
          </button>
          <div className='button-gap'></div>
          <button onClick={() => handleClick(imageAllInfo[displayImageInfo[imageIdRef.current + 1]].ID)} className="button-container">
            {imageAllInfo[displayImageInfo[imageIdRef.current + 1]] && (
              <div className='image-container'>
                <img className='image'
                  src={importRightImageModule}
                  alt={imageAllInfo[displayImageInfo[imageIdRef.current + 1]].IMAGENAME}
                  style={{ width: '300px', height: '250px' }}
                />
                {imageAllInfo[displayImageInfo[imageIdRef.current + 1]].IMAGENAME && <div className="image-name">{imageAllInfo[displayImageInfo[imageIdRef.current + 1]].IMAGENAME}</div>}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
  
};


export default ImageButton;

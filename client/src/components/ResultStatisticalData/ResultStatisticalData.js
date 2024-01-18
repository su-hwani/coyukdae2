import React, { useEffect, useState } from 'react';
import './ResultStatisticalData.css'
import getResultData from '../../api/getResultData';
import getImageOneById from '../../api/getImageOneById';

const ResultStatisticalData = (props) => {

  const importImage = async (importImage, storeFunction) => {
    try {
        const importImageModule = await import(`../../images/${importImage}.jpeg`);
        storeFunction(importImageModule.default)
    } catch (err) {
      console.log(err)
    }
  }

  const [firstImageModule, storeFirstImageModule] = useState();
  const [secondImageModule, storeSecondImageModule] = useState();
  const [thirdImageModule, storeThirdImageModule] = useState();

  const [FinalPickMostImageInfo, setFinalPickMostImageInfo] = useState([{
    IMAGEURL: '',
    IMAGENAME: '',
    ID: 0,
  }]);

  const findResult = props.findResult;

  useEffect(() => {

    const fetchResultData = async () => {
      try {
        const getFinalPickAllData = await getResultData(findResult);
        
        // count_of_ROUND_2를 기준으로 오름차순 정렬
        const sortedData = await getFinalPickAllData.sort((a, b) => b.count_of_ROUND_2 - a.count_of_ROUND_2);

        for (let i = 0; i < sortedData.length; i++) {
          const numericTopWinnerId = parseInt(sortedData[i][findResult], 10);
          const getFinalPickMostData = await getImageOneById(numericTopWinnerId+1);
          
          setFinalPickMostImageInfo(prevState => [
            ...prevState, // 기존 배열의 내용을 그대로 유지
            getFinalPickMostData
          ]);

        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchResultData();
  }, []); // findResult를 의존성 배열에 추가

  useEffect(() => {
    if (FinalPickMostImageInfo.length>=2){
      importImage(FinalPickMostImageInfo[1].IMAGEURL, storeFirstImageModule)
      if (FinalPickMostImageInfo.length>=4){
        importImage(FinalPickMostImageInfo[3].IMAGEURL, storeSecondImageModule)
        if (FinalPickMostImageInfo.length>=6){
          importImage(FinalPickMostImageInfo[5].IMAGEURL, storeThirdImageModule)
        }
      }
    }else {
      console.log("erorr")
    }

  }, [FinalPickMostImageInfo])

  return (
  <div className='rank-container'>
    <div className='rank-container-title'>Ranking</div>
    <div className='ResultFirstImage'>
      {FinalPickMostImageInfo.length >= 2 && (
        <img className='image'
          src={firstImageModule}
          alt={FinalPickMostImageInfo[1].IMAGENAME}
          style={{ width: '120px', height: '120px' }}
        />
      )}
      {FinalPickMostImageInfo.length >= 2 && <div className="image-name">1st {FinalPickMostImageInfo[1].IMAGENAME}</div>}
    </div>  
    <div className='ResultSecondImage'>
      {FinalPickMostImageInfo.length >= 4 && (
        <img className='image'
          src={secondImageModule}
          alt={FinalPickMostImageInfo[3].IMAGENAME}
          style={{ width: '110px', height: '110px' }}
        />
      )}
      {FinalPickMostImageInfo.length >= 4 && <div className="image-name">2nd {FinalPickMostImageInfo[3].IMAGENAME}</div>}
    </div>  
    <div className='ResultThirdImage'>
      {FinalPickMostImageInfo.length >= 6 && (
        <img className='image'
          src={thirdImageModule}
          alt={FinalPickMostImageInfo[5].IMAGENAME}
          style={{ width: '100px', height: '100px' }}
        />
      )}
      {FinalPickMostImageInfo.length >= 6 && <div className="image-name">3rd  {FinalPickMostImageInfo[5].IMAGENAME}</div>}
    </div>  
  </div>
  );
};

export default ResultStatisticalData;

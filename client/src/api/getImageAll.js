import axios from 'axios';
// import apiUrl from './apiUrl';

// API 요청을 보내는 함수
const getImageAll = async () => {
  try {
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}`;

    console.log(URL)
    // API 엔드포인트 URL 설정
    const api = `${URL}/ImageButton/findAll`; 
    console.log(api)
    // API 요청 보내기
    const response = await axios.get(api, { withCredentials: true });
    // 성공적인 응답 처리
    console.log(response)
    console.log("getImageAll response success")

  
    
    return response.data;
  } catch (error) {
    // 오류 처리
    console.error('API 요청 오류:', error);
    throw error; // 오류를 호출자에게 다시 던집니다.
  }
};

export default getImageAll;

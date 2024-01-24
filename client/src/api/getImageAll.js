import axios from 'axios';
// import apiUrl from './apiUrl';

// API 요청을 보내는 함수
const getImageAll = async () => {
  try {
    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `/proxy`;
    // API 엔드포인트 URL 설정
    const api = axios.create({
      baseURL: URL,
      withCredentials: true, //옵션
      headers: { 'Content-Type': 'application/json' }, //옵션
    }); 
    
    const apiEndpoint = '/ImageButton/findAll';

    const response = await axios.get(apiEndpoint);
    
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

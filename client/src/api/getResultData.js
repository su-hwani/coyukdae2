import axios from 'axios';

// API 요청을 보내는 함수
const getResultData = async (selectRoundColumn) => {
    try {
      // API 엔드포인트 URL 설정
      const apiUrl = 'http://localhost:8080/SelectedImage/findColumn'; 
  
      // API 요청 보내기
      const response = await axios.get(apiUrl, {
        params: {
          column: selectRoundColumn
        },
      });
  
      // 성공적인 응답 처리
      return response.data;
    } catch (error) {
      // 오류 처리
      console.error('API 요청 오류:', error);
      throw error; // 오류를 호출자에게 다시 던집니다.
    }
  };
  
  export default getResultData;
  
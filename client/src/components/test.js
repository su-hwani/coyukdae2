import React, { useState } from 'react';

const Test = () => {
  const [responseData, setResponseData] = useState(null);

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8080', {
        method: 'GET', // 또는 다른 HTTP 메서드
        headers: {
          'Content-Type': 'application/json', // 필요에 따라 변경
        },
        // body: JSON.stringify({ key: 'value' }) // 필요에 따라 데이터 전송
      });

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>서버로 데이터 전송</button>
      {responseData && (
        <div>
          <p>서버로부터 받은 데이터:</p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Test;

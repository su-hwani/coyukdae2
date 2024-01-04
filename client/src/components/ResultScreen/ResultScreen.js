// Logo.js
import React, { useEffect, useState } from 'react';
import './ResultScreen.css';

const ResultScreen = () => {
    const [resultImageUrl, storeResultImageUrl] = useState('');
    const [resultImageName, storeResultImageName] = useState('');

    useEffect(() => {
        const fetchCookie = async () => {
            try {
                const cookieString = document.cookie;
                console.log(cookieString)
                const cookieArray = cookieString.split('; ');
                let parsedValue = null;
    
                for (const cookie of cookieArray) {
                    const [name, value] = cookie.split('=');
                
                    if (name.trim() === 'resultImageName') {
                        const decodedValue = decodeURIComponent(value);
                        storeResultImageName(decodedValue);
                    } else if (name.trim() === 'resultImageUrl') {
                        const decodedValue = decodeURIComponent(value);
                        storeResultImageUrl(decodedValue);
                    }
                }
            } catch (error) {
                console.error(error)
            }  
        }
        
        fetchCookie()
    }, []);

    return (
    <div className='ResultComponent'>
        <div className='ResultImageTitle'>Your Best Pick</div>
        <div className='ResultImageCardContainer'>
            <div className='ResultImageContainer'>
                <img
                className='ResultImage'
                src={resultImageUrl}
                alt={resultImageName}
                />
            </div>
            <div className="ResultImageName">{resultImageName}</div>
        </div>
    </div>
    );
};

export default ResultScreen;

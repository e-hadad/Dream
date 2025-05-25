import React from 'react';
import myImage1 from '../ComponnentsNavBar/images/1.webp';
import myImage2 from '../ComponnentsNavBar/images/2.webp';
import myImage3 from '../ComponnentsNavBar/images/3.webp';
import myImage4 from '../ComponnentsNavBar/images/4.webp';
import logo from '../ComponnentsNavBar/images/logo.png';

import './Home.css'; // נייבא את קובץ העיצוב
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const toProducts = (type) => {
        navigate(`/ProductShow/${type}`);

    }
    return (
        <div className="home-container">
            <div className="home-logo">
                <img src={logo} alt="logo" />
            </div>

            <div className="button-grid">
                <button onClick={() => toProducts("BeddingYouth")}>
                    <img src={myImage1} alt="BeddingYouth" />
                </button>
                <button onClick={() => toProducts("BeddingTransit")}>
                    <img src={myImage2} alt="BeddingTransit" />
                </button>
                <button onClick={() => toProducts("BeddingChinldren")}>
                    <img src={myImage3} alt="BeddingChinldren" />
                </button>
                <button onClick={() => toProducts("BeddingSleep")}>
                    <img src={myImage4} alt="BeddingSleep" />
                </button>
            </div>
        </div>

    );
}

export default Home;

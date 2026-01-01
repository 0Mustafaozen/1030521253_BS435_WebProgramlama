import React from 'react';

const WelcomeScreen = ({ onStart }) => {
    return (
        <div className="welcome-screen">
            <h1>AI Görsel Oyunu: Gerçeği Bul</h1>
            <p>Yapay zeka tarafından üretilen görselleri ayırt edebilir misin?</p>

            <div className="rules">
                <h3>Kurallar:</h3>
                <ul>
                    <li>3 görselden hangisinin AI olduğunu bul.</li>
                    <li>Yanlış yaparsan ipucu alıp tekrar dene.</li>
                </ul>
            </div>

            <div className="mode-selection">
                <button onClick={() => onStart('detective')}>Dedektif Modu (5 Tur)</button>
                <button onClick={() => onStart('survival')}>Sonsuz Mod (Tek Hak)</button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
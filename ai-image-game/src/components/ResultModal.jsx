// src/components/ResultModal.jsx
import React from 'react';

const ResultModal = ({ score, total, onRestart }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>🏁 Oyun Bitti!</h2>

                <div className="score-display">
                    <p>Toplam Puanın:</p>
                    <h1>{score}</h1>
                </div>

                <p>Toplam {total} soru tamamlandı.</p>

                <button className="restart-btn" onClick={onRestart}>
                    Tekrar Oyna 🔄
                </button>
            </div>
        </div>
    );
};

export default ResultModal;
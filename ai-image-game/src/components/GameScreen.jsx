import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions'; // Veri dosyanız
import ResultModal from './ResultModal';

const GameScreen = ({ mode, onEnd }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [attempt, setAttempt] = useState(1); // 1. veya 2. deneme
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState(""); // Kullanıcıya anlık geri bildirim

    const currentQuestion = questions[currentQuestionIndex];

    // Görselleri karıştırmak için (opsiyonel)
    // useEffect içinde shuffle mantığı kurulabilir.

    const handleImageClick = (imageId, isAi) => {
        if (gameOver) return;

        // DOĞRU TAHMİN
        if (isAi) {
            let points = attempt === 1 ? 20 : 10; // İlk hakta bilirse tam puan
            setScore(score + points);
            setMessage("Tebrikler! Doğru bildin.");

            setTimeout(() => {
                nextLevel();
            }, 1500);
        }
        // YANLIŞ TAHMİN
        else {
            if (attempt === 1) {
                // İLK YANLIŞ: İpucu göster
                setAttempt(2);
                setShowHint(true);
                setMessage("Yanlış cevap! İpucuna bak ve tekrar dene.");
            } else {
                // İKİNCİ YANLIŞ: Oyun biter veya tur biter
                if (mode === 'survival') {
                    finishGame();
                } else {
                    setMessage("Maalesef bilemedin. Sıradaki soru...");
                    setTimeout(() => nextLevel(), 1500);
                }
            }
        }
    };

    const nextLevel = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            setAttempt(1);
            setShowHint(false);
            setMessage("");
        } else {
            finishGame();
        }
    };

    const finishGame = () => {
        setGameOver(true);
    };

    if (gameOver) {
        return <ResultModal score={score} onRestart={onEnd} total={questions.length} />;
    }

    return (
        <div className="game-screen">
            <div className="status-bar">
                <span>Mod: {mode === 'detective' ? 'Dedektif' : 'Sonsuz'}</span>
                <span>Puan: {score}</span>
            </div>

            <h2>Hangi görsel AI tarafından üretildi?</h2>

            {message && <div className="feedback-message">{message}</div>}

            <div className="images-container">
                {currentQuestion.images.map((img) => (
                    // Eğer ipucu açıksa ve bu resim AI değilse (ve yanlış seçilmişse)
                    // görseli grileştirmek gibi CSS stilleri eklenebilir.
                    <div key={img.id} onClick={() => handleImageClick(img.id, img.isAi)} className="image-card">
                        <img src={img.url} alt="tahmin" />
                    </div>
                ))}
            </div>

            {showHint && (
                <div className="hint-box">
                    <h4>💡 İPUCU:</h4>
                    <p>{currentQuestion.hint}</p>
                </div>
            )}
        </div>
    );
};

export default GameScreen;
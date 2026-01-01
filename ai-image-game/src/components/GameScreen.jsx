import React, { useState, useEffect } from 'react';
import { generateQuestions } from '../data/questions'; // Yeni fonksiyonu import et
import ResultModal from './ResultModal';

const GameScreen = ({ mode, onEnd }) => {
    // Soruları state içinde tutuyoruz çünkü artık dinamik oluşturuluyorlar
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [attempt, setAttempt] = useState(1);
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");

    // Oyun başladığında soruları üret
    useEffect(() => {
        // Dedektif moduysa 5 soru, Sonsuz modsa örneğin 50 soru üretelim
        const questionCount = mode === 'detective' ? 5 : 50;
        const newQuestions = generateQuestions(questionCount);
        setQuestions(newQuestions);
    }, [mode]);

    // Sorular henüz yüklenmediyse bekle
    if (questions.length === 0) {
        return <div className="loading">Sorular Hazırlanıyor...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const handleImageClick = (isAi) => {
        if (gameOver) return;

        if (isAi) {
            // DOĞRU
            let points = attempt === 1 ? 20 : 10;
            setScore(score + points);
            setMessage("Tebrikler! Doğru bildin. 🎯");

            // Hızlıca diğer soruya geç
            setTimeout(() => nextLevel(), 1000);
        } else {
            // YANLIŞ
            if (attempt === 1) {
                setAttempt(2);
                setShowHint(true);
                setMessage("Yanlış! İpucu açıldı, tekrar dene.");
            } else {
                if (mode === 'survival') {
                    finishGame();
                } else {
                    setMessage("Bilemedin. Sıradaki soru...");
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
        return <ResultModal score={score} total={currentQuestionIndex + 1} onRestart={onEnd} />;
    }

    return (
        <div className="game-screen">
            <div className="status-bar">
                <span>Mod: {mode === 'detective' ? 'Dedektif' : 'Sonsuz'}</span>
                <span>Puan: {score}</span>
                <span>Soru: {currentQuestionIndex + 1} / {questions.length}</span>
            </div>

            <h2>Hangi görsel AI tarafından üretildi?</h2>

            {message && <div className="feedback-message">{message}</div>}

            <div className="images-container">
                {currentQuestion.images.map((img) => (
                    <div key={img.id} onClick={() => handleImageClick(img.isAi)} className="image-card">
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
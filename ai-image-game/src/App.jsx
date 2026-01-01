import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import './App.css';

function App() {
    const [gameMode, setGameMode] = useState(null); // 'detective' veya 'survival'

    const startGame = (mode) => {
        setGameMode(mode);
    };

    const backToMenu = () => {
        setGameMode(null);
    };

    return (
        <div className="app-container">
            {!gameMode ? (
                <WelcomeScreen onStart={startGame} />
            ) : (
                <GameScreen mode={gameMode} onEnd={backToMenu} />
            )}
        </div>
    );
}

export default App;
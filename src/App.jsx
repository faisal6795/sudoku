import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import Game from './Game';

export default function App() {
    const [isDashboard, setDashboard] = useState(false);
    const [difficulty, setDifficulty] = useState(0);

    return (
        <div className="container">
            {isDashboard ? (
                <Dashboard
                    gotoGame={() => setDashboard(false)}
                    level={difficulty}
                    changeLevel={(level) => setDifficulty(level)}
                />
            ) : (
                <Game
                    gotoDashboard={() => setDashboard(true)}
                    level={difficulty}
                />
            )}
        </div>
    );
}

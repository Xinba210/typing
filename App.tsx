
import React, { useState, useCallback, useEffect } from 'react';
import { GameState } from './types';
import { LEVELS } from './constants';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import LevelSelectionScreen from './components/LevelSelectionScreen';
import LeaderboardScreen from './components/LeaderboardScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);

  const goToLevelSelection = useCallback(() => {
    setGameState(GameState.LevelSelection);
  }, []);

  const selectLevelAndStart = useCallback((levelIndex: number) => {
    setCurrentLevelIndex(levelIndex);
    setScore(0);
    setGameState(GameState.Playing);
  }, []);

  const goToStart = useCallback(() => {
    setGameState(GameState.Start);
  }, []);

  const goToLeaderboard = useCallback(() => {
    setGameState(GameState.Leaderboard);
  }, []);

  const handleLevelComplete = useCallback((levelScore: number) => {
    setScore(prev => prev + levelScore);
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
      setGameState(GameState.LevelComplete);
    } else {
      setGameState(GameState.GameEnd);
    }
  }, [currentLevelIndex]);

  const nextLevel = useCallback(() => {
    setGameState(GameState.Playing);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
        if (e.key === 'Enter' || e.key === ' ') {
          if (gameState === GameState.Start) {
            goToLevelSelection();
          } else if (gameState === GameState.LevelComplete) {
            nextLevel();
          } else if (gameState === GameState.GameEnd) {
            goToLevelSelection();
          } else if (gameState === GameState.Leaderboard) {
            goToStart();
          }
        }
      };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, goToLevelSelection, nextLevel, goToStart]);

  const renderContent = () => {
      switch (gameState) {
        case GameState.Start:
          return <StartScreen onStart={goToLevelSelection} onShowLeaderboard={goToLeaderboard} />;
        case GameState.LevelSelection:
          return <LevelSelectionScreen onSelectLevel={selectLevelAndStart} onBack={goToStart} />;
        case GameState.Playing:
          return (
            <GameScreen
              level={LEVELS[currentLevelIndex]}
              levelNumber={currentLevelIndex + 1}
              onLevelComplete={handleLevelComplete}
            />
          );
      case GameState.LevelComplete: {
        const nextLevelDetails = LEVELS[currentLevelIndex];
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-5xl font-bold text-yellow-300 mb-4">闖關成功！</h2>
            <p className="text-2xl mb-6">目前總分：{score}</p>

            <div className="my-4 p-4 bg-slate-800/50 rounded-lg max-w-md">
              <h3 className="text-2xl font-bold text-sky-300">下一關：{nextLevelDetails.title}</h3>
              {nextLevelDetails.description && <p className="text-slate-300 mt-2">{nextLevelDetails.description}</p>}
            </div>

            <button
              onClick={nextLevel}
              className="mt-6 px-8 py-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
            >
              繼續挑戰
            </button>
            <p className="mt-3 text-sm text-slate-400">按下 Enter 或 空白鍵 繼續</p>
          </div>
        );
      }
        case GameState.GameEnd:
          return <EndScreen score={score} onRestart={goToLevelSelection} />;
        case GameState.Leaderboard:
          return <LeaderboardScreen onBack={goToStart} />;
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-sky-900 flex flex-col items-center justify-center p-4">
      <header className="w-full max-w-7xl mx-auto text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
          中文注音打字闖關
        </h1>
      </header>
      <main className="w-full max-w-7xl min-h-[700px] bg-black/30 rounded-2xl shadow-2xl p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
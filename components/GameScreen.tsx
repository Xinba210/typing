import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Level, LevelType } from '../types';
import { ZHUYIN_MAP, ZHUYIN_TO_KEY, KEY_TO_ZHUYIN, KEY_TO_FINGER_MAP, FINGER_NAME_MAP } from '../constants';
import CharacterInput from './CharacterInput';
import VirtualKeyboard from './VirtualKeyboard';
import { speak } from '../utils/speech';

interface GameScreenProps {
  level: Level;
  levelNumber: number;
  onLevelComplete: (score: number) => void;
}

type GamePhase = 'introduction' | 'practice';

const SpeakerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.828 2.828a1 1 0 011.414 0A5.98 5.98 0 0115 10a5.98 5.98 0 01-1.757 4.243 1 1 0 01-1.414-1.414A3.986 3.986 0 0013 10a3.986 3.986 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const GameScreen: React.FC<GameScreenProps> = ({ level, levelNumber, onLevelComplete }) => {
  const [practiceUnits, setPracticeUnits] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [virtualEvent, setVirtualEvent] = useState<{ key: string; timestamp: number } | null>(null);
  const [phase, setPhase] = useState<GamePhase>('practice');
  const [introductionIndex, setIntroductionIndex] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  
  useEffect(() => {
    let units: string[] = [];
    if (level.type === LevelType.SingleBopomofo) {
      units = (level.content as string).split('');
      setPhase('introduction');
      setIntroductionIndex(0);
      speak(units[0]);
    } else if (level.type === LevelType.Syllable || level.type === LevelType.Word || level.type === LevelType.Random) {
      units = level.content as string[];
      setPhase('practice');
    }
    setPracticeUnits(units);
    
    // Reset for new level
    setCurrentIndex(0);
    setUserInputs(Array(units.length).fill(''));
    setIncorrectAttempts(0);
    setStartTime(Date.now());
    setActiveKey(null);
  }, [level]);
  
  useEffect(() => {
    if (phase === 'practice') {
        const timer = setInterval(() => {
          setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }
  }, [startTime, phase]);
  
  const handleIncorrect = useCallback(() => {
    setIncorrectAttempts(prev => prev + 1);
    setIsWrong(true);
    setTimeout(() => setIsWrong(false), 300);
  }, []);

  const processIntroInput = useCallback((key: string) => {
    if (practiceUnits.length === 0) return;
    
    const currentSymbol = practiceUnits[introductionIndex];
    const expectedKey = ZHUYIN_TO_KEY[currentSymbol];
    
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 150);

    if (key === expectedKey) {
        if (introductionIndex < practiceUnits.length - 1) {
            const nextIndex = introductionIndex + 1;
            setIntroductionIndex(nextIndex);
            speak(practiceUnits[nextIndex]);
        } else {
            setPhase('practice');
            setStartTime(Date.now());
        }
    } else {
        handleIncorrect();
    }
  }, [introductionIndex, practiceUnits, handleIncorrect]);


  useEffect(() => {
    if (phase !== 'introduction') return;

    const handleIntroKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) return;
        const key = e.key.toLowerCase();
        processIntroInput(key);
    };
    window.addEventListener('keydown', handleIntroKeyDown);
    return () => window.removeEventListener('keydown', handleIntroKeyDown);
  }, [phase, processIntroInput]);


  const handleCorrect = useCallback(() => {
    if (currentIndex < practiceUnits.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const timeTaken = (Date.now() - startTime) / 1000;
      const baseScore = practiceUnits.length * 100;
      const timeBonus = Math.max(0, (practiceUnits.length * 5) - Math.floor(timeTaken)) * 10;
      const accuracyBonus = Math.max(0, baseScore - incorrectAttempts * 20);
      const totalScore = timeBonus + accuracyBonus;
      onLevelComplete(Math.max(10, totalScore));
    }
  }, [currentIndex, practiceUnits.length, startTime, incorrectAttempts, onLevelComplete]);

  const handleUserUpdate = (index: number, zhuyin: string) => {
    const newInputs = [...userInputs];
    newInputs[index] = zhuyin;
    setUserInputs(newInputs);
  };
  
  const handlePracticeKeyPress = useCallback((key: string) => {
    setActiveKey(key);
    setTimeout(() => setActiveKey(null), 150);
    setVirtualEvent({ key, timestamp: Date.now() });
  }, []);

  useEffect(() => {
    if (phase !== 'practice') return;

    const handlePracticeKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) return;
        const key = e.key.toLowerCase();
        // Allow character keys, space, and backspace for practice
        if (KEY_TO_ZHUYIN[key] || key === 'backspace') {
           handlePracticeKeyPress(key);
        }
    };

    window.addEventListener('keydown', handlePracticeKeyDown);
    return () => window.removeEventListener('keydown', handlePracticeKeyDown);
  }, [phase, handlePracticeKeyPress]);
  
  
  const getCorrectZhuyinForUnit = (unit: string): string => {
      if (level.type === LevelType.SingleBopomofo || level.type === LevelType.Syllable) {
          return unit;
      }
      return ZHUYIN_MAP[unit] || '';
  };

  const currentIntroSymbol = practiceUnits[introductionIndex];
  const highlightKey = phase === 'introduction' ? ZHUYIN_TO_KEY[currentIntroSymbol] : null;
  const fingerInfo = highlightKey ? KEY_TO_FINGER_MAP[highlightKey] : null;

  return (
    <div className="flex flex-col h-full">
        <style>{`.animate-shake { animation: shake 0.5s; } @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }`}</style>
      <div className="flex justify-between items-center mb-6 p-4 bg-slate-800/50 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-sky-300">{level.title}</h2>
          {level.type !== LevelType.Random && <p className="text-slate-400">第 {levelNumber} 關</p>}
          {level.description && <p className="text-sm text-slate-300 mt-1">{level.description}</p>}
        </div>
        <div className="text-right">
          <p className="text-xl">時間: <span className="font-mono text-yellow-300">{phase === 'practice' ? elapsedTime : '-'}s</span></p>
          <p className="text-xl">失誤: <span className="font-mono text-red-400">{incorrectAttempts}</span></p>
        </div>
      </div>
      
      <div className="flex-grow flex flex-row flex-wrap items-start justify-center gap-2 md:gap-4 p-4">
        {phase === 'introduction' && (
           <div className={`flex flex-col items-center justify-center text-center transition-transform duration-300 w-full h-full ${isWrong ? 'animate-shake' : ''}`}>
             <div className="flex-grow flex flex-col items-center justify-center">
                <p className="text-2xl text-slate-300 mb-4">教學模式：認識注音與鍵盤位置</p>
                <div className="flex items-center gap-4 mb-4">
                    <div className="text-9xl font-bold p-8 rounded-2xl bg-slate-800/50">{currentIntroSymbol}</div>
                    <button onClick={() => speak(currentIntroSymbol)} className="p-4 rounded-full bg-sky-500/50 hover:bg-sky-500 transition-colors">
                        <SpeakerIcon />
                    </button>
                </div>
                 {fingerInfo && (
                    <p className="text-xl text-yellow-300 animate-pulse h-7">
                        請用 <span className="font-bold">{fingerInfo.hand === 'left' ? '左手' : '右手'}</span> 的 <span className="font-bold">{FINGER_NAME_MAP[fingerInfo.finger]}</span> 按下按鍵
                    </p>
                 )}
                {!fingerInfo && <div className="h-7" />}
             </div>
           </div>
        )}

        {phase === 'practice' && practiceUnits.map((unit, index) => {
          const correctZhuyin = getCorrectZhuyinForUnit(unit);
          if (!correctZhuyin) {
            return <div key={index} className="text-red-500">Error: Missing Zhuyin for '{unit}'</div>;
          }
          return (
            <CharacterInput
              key={`${level.title}-${unit}-${index}`}
              targetChar={unit}
              correctZhuyin={correctZhuyin}
              isActive={index === currentIndex}
              onCorrect={handleCorrect}
              onIncorrect={handleIncorrect}
              onUpdate={(zhuyin) => handleUserUpdate(index, zhuyin)}
              levelType={level.type}
              virtualEvent={virtualEvent}
            />
          );
        })}
      </div>

      <VirtualKeyboard 
        onKeyPress={phase === 'introduction' ? processIntroInput : handlePracticeKeyPress} 
        activeKey={activeKey} 
        highlightKey={highlightKey}
        />
    </div>
  );
};

export default GameScreen;
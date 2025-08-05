import React, { useState, useEffect, useRef, useCallback } from 'react';
import { KEY_TO_ZHUYIN } from '../constants';
import { LevelType } from '../types';

interface CharacterInputProps {
  targetChar: string;
  correctZhuyin: string;
  isActive: boolean;
  onCorrect: () => void;
  onIncorrect: () => void;
  onUpdate: (zhuyin: string) => void;
  levelType: LevelType;
  virtualEvent: { key: string; timestamp: number } | null;
}

const CharacterInput: React.FC<CharacterInputProps> = ({
  targetChar,
  correctZhuyin,
  isActive,
  onCorrect,
  onIncorrect,
  onUpdate,
  levelType,
  virtualEvent
}) => {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  
  const isCorrectRef = useRef(isCorrect);
  isCorrectRef.current = isCorrect;
  
  // Resets state when the target character changes (new level/unit)
  useEffect(() => {
    setUserInput('');
    setIsCorrect(false);
    setIsWrong(false);
  }, [targetChar, correctZhuyin]);


  const processInput = useCallback((key: string) => {
    if (isCorrectRef.current) return;

    if (key === 'backspace') {
      setUserInput(prev => {
        const nextInput = prev.slice(0, -1);
        onUpdate(nextInput);
        return nextInput;
      });
      setIsWrong(false);
      return;
    }

    const zhuyinChar = KEY_TO_ZHUYIN[key];
    if (zhuyinChar) {
      const nextInput = userInput + zhuyinChar;
      if (correctZhuyin.startsWith(nextInput)) {
        setUserInput(nextInput);
        onUpdate(nextInput);
        setIsWrong(false);
        if (nextInput === correctZhuyin) {
          setIsCorrect(true);
          onCorrect();
        }
      } else {
        onIncorrect();
        setIsWrong(true);
        setTimeout(() => setIsWrong(false), 300);
      }
    }
  }, [userInput, correctZhuyin, onCorrect, onIncorrect, onUpdate]);
  
  // Handles virtual keyboard presses and physical keyboard events from parent
  useEffect(() => {
    if(isActive && virtualEvent) {
      processInput(virtualEvent.key);
    }
  }, [virtualEvent, isActive, processInput]);

  const isPracticeMode = levelType === LevelType.SingleBopomofo || levelType === LevelType.Syllable;
  const isLongPhrase = levelType === LevelType.Word && targetChar.length > 5;

  const wrapperClasses = `
    relative flex flex-col items-center justify-center transition-all duration-300
    p-4 rounded-xl cursor-default
    ${isLongPhrase ? 'w-full h-auto' : 'w-28 h-44'}
    ${isActive 
      ? (isLongPhrase 
          ? 'bg-sky-500/30 shadow-lg shadow-sky-500/20' 
          : 'bg-sky-500/30 scale-110 shadow-lg shadow-sky-500/20'
        ) 
      : 'bg-slate-800/50'
    }
    ${isCorrect ? 'border-2 border-green-400' : ''}
    ${isWrong ? 'animate-shake border-2 border-red-500' : ''}
  `;
  
  const targetCharClasses = `
    font-bold text-slate-100 mb-2 flex items-center justify-center
    ${isLongPhrase 
      ? 'text-3xl h-auto text-left w-full' 
      : `h-20 ${targetChar.length > 2 ? 'text-4xl' : 'text-6xl'}`
    }
  `;

  return (
    <div className={wrapperClasses}>
      <div className={targetCharClasses}>{targetChar}</div>
      <div className={`h-10 text-center font-mono tracking-widest ${isLongPhrase ? 'text-xl' : 'text-2xl'} ${isCorrect ? 'text-green-300' : 'text-yellow-300'}`}>
        {isCorrect ? correctZhuyin : userInput}
      </div>
      <div className="text-xs text-slate-400 mt-auto h-4">
          {isCorrect ? '✔' : (isPracticeMode ? '' : correctZhuyin)}
      </div>
    </div>
  );
};

export default CharacterInput;
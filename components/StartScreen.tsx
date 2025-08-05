
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="mb-8">
        <h2 className="text-5xl font-bold text-sky-300 mb-2">準備好挑戰了嗎？</h2>
        <p className="text-xl text-slate-300">測試你的注音打字速度與準確度！</p>
      </div>
      <button
        onClick={onStart}
        className="px-10 py-5 bg-indigo-600 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
      >
        開始遊戲
      </button>
      <p className="mt-4 text-sm text-slate-400">按下 Enter 或 空白鍵 開始</p>
    </div>
  );
};

export default StartScreen;

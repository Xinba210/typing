
import React from 'react';

interface EndScreenProps {
  score: number;
  highestScore: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, highestScore, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
       <h2 className="text-5xl font-bold text-green-400 mb-4">恭喜！全數通關！</h2>
      <p className="text-3xl mb-4">你的最終得分是：<span className="font-bold text-yellow-300">{score}</span></p>
      <p className="text-2xl mb-8">最高紀錄：<span className="font-bold text-yellow-300">{highestScore}</span></p>
      <button
        onClick={onRestart}
        className="px-10 py-5 bg-indigo-600 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
      >
        再玩一次
      </button>
      <p className="mt-4 text-sm text-slate-400">按下 Enter 或 空白鍵 繼續</p>
    </div>
  );
};

export default EndScreen;

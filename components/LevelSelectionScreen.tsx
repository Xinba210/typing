import React from 'react';
import { LEVELS } from '../constants';
import { Level } from '../types';

interface LevelSelectionScreenProps {
  onSelectLevel: (levelIndex: number) => void;
  onBack: () => void;
}

const LevelCard: React.FC<{ level: Level, index: number, onSelect: (index: number) => void }> = ({ level, index, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(index)}
            className="bg-slate-800/70 p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:bg-sky-500/30 hover:shadow-sky-500/20 hover:scale-105"
        >
            <p className="text-sm text-sky-300 font-semibold">第 {index + 1} 課</p>
            <h3 className="text-xl font-bold text-white mt-1 truncate">{level.title}</h3>
            {level.description && <p className="text-slate-400 text-sm mt-2 h-10 overflow-hidden">{level.description}</p>}
        </div>
    )
}

const LevelSelectionScreen: React.FC<LevelSelectionScreenProps> = ({ onSelectLevel, onBack }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-4xl font-bold text-center text-yellow-300 mb-6">選擇關卡</h2>
      <div className="flex-grow overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {LEVELS.map((level, index) => (
          <LevelCard key={index} level={level} index={index} onSelect={onSelectLevel} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-lg hover:bg-slate-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-500"
        >
          返回主畫面
        </button>
      </div>
    </div>
  );
};

export default LevelSelectionScreen;

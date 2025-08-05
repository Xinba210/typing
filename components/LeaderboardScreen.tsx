import React, { useEffect, useState } from 'react';

interface ScoreEntry {
  name: string;
  score: number;
}

interface LeaderboardScreenProps {
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch('/api/scores');
        if (!res.ok) {
          throw new Error('Failed to fetch scores');
        }
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScores();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-5xl font-bold text-sky-300 mb-6">排行榜</h2>
      <table className="text-xl text-white mb-6">
        <thead>
          <tr>
            <th className="px-4 py-2">名次</th>
            <th className="px-4 py-2">玩家</th>
            <th className="px-4 py-2">分數</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((entry, index) => (
            <tr key={index} className="odd:bg-slate-800/50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{entry.name}</td>
              <td className="px-4 py-2">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onBack}
        className="px-8 py-4 bg-indigo-600 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
      >
        返回
      </button>
    </div>
  );
};

export default LeaderboardScreen;

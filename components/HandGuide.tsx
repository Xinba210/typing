import React from 'react';
import { KEY_TO_ZHUYIN, KEY_TO_FINGER_MAP, FINGER_NAME_MAP, KEYBOARD_LAYOUT, SPECIAL_KEY_PROPS } from '../constants';

interface HandGuideProps {
  highlightKey: string | null;
}

const HandGuide: React.FC<HandGuideProps> = ({ highlightKey }) => {
  const fingerInfo = highlightKey ? KEY_TO_FINGER_MAP[highlightKey] : null;

  return (
    <div className="flex flex-col items-center gap-4 mt-auto w-full">
      {fingerInfo && (
        <p className="text-xl text-yellow-300 animate-pulse h-7">
          請用 <span className="font-bold">{fingerInfo.hand === 'left' ? '左手' : '右手'}</span> 的 <span className="font-bold">{FINGER_NAME_MAP[fingerInfo.finger]}</span> 按下按鍵
        </p>
      )}
      {!fingerInfo && <div className="h-7" />}
      
      <div className="p-2 md:p-3 bg-slate-800/60 rounded-lg shadow-inner space-y-1 md:space-y-1.5 w-full max-w-5xl">
        {KEYBOARD_LAYOUT.map((row) => (
          <div key={row.join('')} className="flex justify-center gap-1 md:gap-1.5 w-full">
            {row.map((key) => {
              const zhuyin = KEY_TO_ZHUYIN[key];
              const specialProps = SPECIAL_KEY_PROPS[key];
              const isHighlighted = highlightKey === key;
              const fingerName = isHighlighted && fingerInfo ? FINGER_NAME_MAP[fingerInfo.finger] : null;
              
              let widthClass = 'w-10 md:w-14';
              if (specialProps) {
                widthClass = specialProps.widthClass;
              }

              if (!zhuyin && !specialProps) {
                 return <div key={key} className={`${widthClass} h-12 md:h-14 rounded bg-slate-700/40`}></div>;
              }

              const keyClasses = `
                relative flex flex-col items-center justify-center h-12 md:h-14
                rounded font-mono transition-all duration-200
                border-b-4 
                ${isHighlighted
                  ? 'bg-green-600 border-green-700 ring-2 ring-green-400 scale-105 shadow-lg'
                  : 'bg-slate-700 border-slate-800'
                }
              `;

              let displayContent;
              if (specialProps) {
                displayContent = <span className="text-xs md:text-sm text-slate-300">{specialProps.label}</span>;
              } else if (zhuyin) {
                const isTone = ['ˊ', 'ˇ', 'ˋ', '˙'].includes(zhuyin);
                if (isTone) {
                    displayContent = <span className="text-white">{zhuyin}</span>;
                } else {
                    displayContent = <>
                        <span className="text-lg md:text-xl text-white">{zhuyin}</span>
                        <span className="text-xs text-slate-400">{key.toUpperCase()}</span>
                    </>;
                }
              }

              return (
                <div key={key} className={`${keyClasses} ${widthClass}`}>
                  {fingerName && (
                    <div className="absolute -top-10 text-sm bg-green-500 text-white font-bold px-2 py-1 rounded-md shadow-lg z-10">
                      {fingerName}
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-green-500"></div>
                    </div>
                  )}
                  {displayContent}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandGuide;
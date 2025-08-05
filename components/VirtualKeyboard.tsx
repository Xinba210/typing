import React from 'react';
import { KEY_TO_ZHUYIN, KEYBOARD_LAYOUT, SPECIAL_KEY_PROPS, KEY_TO_FINGER_MAP, FINGER_NAME_MAP } from '../constants';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  activeKey: string | null;
  highlightKey?: string | null;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onKeyPress, activeKey, highlightKey }) => {

  const handleKeyClick = (key: string) => {
    onKeyPress(key);
  };

  return (
    <div className="w-full flex justify-center mt-auto">
      <div className="p-2 md:p-3 bg-slate-900/50 rounded-lg space-y-1 md:space-y-1.5 w-full max-w-5xl">
        {KEYBOARD_LAYOUT.map((row) => (
          <div key={row.join('')} className="flex justify-center gap-1 md:gap-1.5 w-full">
            {row.map((key) => {
              const zhuyin = KEY_TO_ZHUYIN[key];
              const specialProps = SPECIAL_KEY_PROPS[key];
              const isActive = activeKey === key;
              const isHighlighted = highlightKey === key;
              const fingerInfo = isHighlighted ? KEY_TO_FINGER_MAP[key] : null;
              const fingerName = fingerInfo ? FINGER_NAME_MAP[fingerInfo.finger] : null;

              const isMappable = !!zhuyin;

              let widthClass = 'w-10 md:w-14';
              if (specialProps) {
                widthClass = specialProps.widthClass;
              }

              if (!isMappable && !specialProps) {
                // Placeholder for keys like '=', '['
                return <div key={key} className={`${widthClass} h-12 md:h-14 rounded bg-slate-800/50`}></div>;
              }
              
              const isInteractive = isMappable; // Only zhuyin keys and space are interactive
              const keyClasses = `
                relative flex flex-col items-center justify-center h-12 md:h-14
                rounded font-mono transition-all duration-150
                border-b-4 
                ${isInteractive 
                  ? 'bg-slate-700 hover:bg-sky-600 active:bg-sky-500 border-slate-800 active:border-sky-600 cursor-pointer' 
                  : 'bg-slate-700/50 border-slate-800/50 text-slate-400'
                }
                ${isActive ? '!bg-sky-500 scale-110 shadow-lg' : ''}
                ${isHighlighted ? '!bg-green-600 !border-green-700 ring-2 ring-green-400 scale-105 shadow-lg' : ''}
              `;

              let displayContent;
              if (specialProps) {
                  displayContent = <span className="text-xs md:text-sm">{specialProps.label}</span>;
              } else if (zhuyin) {
                  const isTone = ['ˊ', 'ˇ', 'ˋ', '˙'].includes(zhuyin);
                  if (isTone) {
                      displayContent = zhuyin;
                  } else {
                      displayContent = <><span className="text-lg md:text-xl">{zhuyin}</span><span className="text-xs text-slate-400">{key.toUpperCase()}</span></>;
                  }
              }

              return (
                <button
                  key={key}
                  onClick={() => isInteractive && handleKeyClick(key)}
                  disabled={!isInteractive}
                  className={`${keyClasses} ${widthClass}`}
                >
                  {fingerName && (
                    <div className="absolute -top-10 text-sm bg-green-500 text-white font-bold px-2 py-1 rounded-md shadow-lg z-10">
                      {fingerName}
                      <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-green-500"></div>
                    </div>
                  )}
                  {displayContent}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
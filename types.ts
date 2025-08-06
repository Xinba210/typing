export enum GameState {
  Start,
  LevelSelection,
  Playing,
  LevelComplete,
  GameEnd,
}

export enum LevelType {
  SingleBopomofo, // Practice single zhuyin symbols like ㄅ, ㄆ, ㄇ, ㄈ
  Syllable,       // Practice combinations like ㄅㄚ, ㄆㄛˋ
  Word,           // Practice actual words like 你好, 台灣
  Random,         // Randomly generated practice content
}

export interface Level {
  title: string;
  type: LevelType;
  content: string | string[]; // string for SingleBopomofo, string[] for Syllable/Word/Random
  description?: string;
}

export type Hand = 'left' | 'right';
export type Finger = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';

export interface FingerInfo {
  hand: Hand;
  finger: Finger;
}
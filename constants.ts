import { Level, LevelType, FingerInfo } from './types';

export const LEVELS: Level[] = [
  { title: "第一課：聲母 (1)", type: LevelType.SingleBopomofo, content: "ㄅㄆㄇㄈ", description: "練習基本的唇音。"},
  { title: "第二課：聲母 (2)", type: LevelType.SingleBopomofo, content: "ㄉㄊㄋㄌ", description: "練習舌尖音。"},
  { title: "第三課：聲母 (3)", type: LevelType.SingleBopomofo, content: "ㄍㄎㄏ", description: "練習舌根音。"},
  { title: "第四課：聲母 (4)", type: LevelType.SingleBopomofo, content: "ㄐㄑㄒ", description: "練習舌面音。"},
  { title: "第五課：聲母 (5)", type: LevelType.SingleBopomofo, content: "ㄓㄔㄕㄖ", description: "練習翹舌音。"},
  { title: "第六課：聲母 (6)", type: LevelType.SingleBopomofo, content: "ㄗㄘㄙ", description: "練習平舌音。"},
  { title: "第七課：單韻母", type: LevelType.SingleBopomofo, content: "ㄚㄛㄜㄝ", description: "練習基本的單韻母。"},
  { title: "第八課：複韻母", type: LevelType.SingleBopomofo, content: "ㄞㄟㄠㄡ", description: "練習複韻母。"},
  { title: "第九課：鼻韻母", type: LevelType.SingleBopomofo, content: "ㄢㄣㄤㄥ", description: "練習鼻化音。"},
  { title: "第十課：結合韻母", type: LevelType.SingleBopomofo, content: "ㄧㄨㄩ", description: "練習作為介音的韻母。"},
  { title: "第十一課：聲調練習", type: LevelType.SingleBopomofo, content: "ˊˇˋ˙", description: "練習二、三、四聲與輕聲。"},
  { title: "第十二課：音節練習 (1)", type: LevelType.Syllable, content: ["ㄅㄚ", "ㄆㄚ", "ㄇㄚ", "ㄈㄚ"], description: "將聲母與韻母結合。"},
  { title: "第十三課：音節練習 (2)", type: LevelType.Syllable, content: ["ㄉㄚˇ", "ㄊㄚˇ", "ㄋㄚˇ", "ㄌㄚˇ"], description: "加入聲調進行練習。"},
  { title: "第十四課：基礎詞彙", type: LevelType.Word, content: ["你好", "台灣", "中文"], description: "開始練習常用詞彙。"},
  { title: "第十五課：生活用語", type: LevelType.Word, content: ["今天", "天氣", "真好"], description: "練習更長的詞組。"},
  { title: "第十六課：挑戰長句", type: LevelType.Word, content: ["我喜歡用電腦學習新知識"], description: "挑戰完整的句子輸入。"},
];

export const ZHUYIN_MAP: { [key: string]: string } = {
  // Original
  '你': 'ㄋㄧˇ', '好': 'ㄏㄠˇ', '台': 'ㄊㄞˊ', '灣': 'ㄨㄢ',
  '中': 'ㄓㄨㄥ', '文': 'ㄨㄣˊ', '打': 'ㄉㄚˇ', '字': 'ㄗˋ',
  '練': 'ㄌㄧㄢˋ', '習': 'ㄒㄧˊ',
  '今': 'ㄐㄧㄣ', '天': 'ㄊㄧㄢ', '氣': 'ㄑㄧˋ', '真': 'ㄓㄣ',
  '我': 'ㄨㄛˇ', '喜': 'ㄒㄧˇ', '歡': 'ㄏㄨㄢ', '用': 'ㄩㄥˋ',
  '電': 'ㄉㄧㄢˋ', '腦': 'ㄋㄠˇ', '學': 'ㄒㄩㄝˊ',
  '新': 'ㄒㄧㄣ', '知': 'ㄓ', '識': 'ㄕˋ',
};

export const KEY_TO_ZHUYIN: { [key: string]: string } = {
  '1': 'ㄅ', 'q': 'ㄆ', 'a': 'ㄇ', 'z': 'ㄈ',
  '2': 'ㄉ', 'w': 'ㄊ', 's': 'ㄋ', 'x': 'ㄌ',
  'e': 'ㄍ', 'd': 'ㄎ', 'c': 'ㄏ',
  'r': 'ㄐ', 'f': 'ㄑ', 'v': 'ㄒ',
  '5': 'ㄓ', 't': 'ㄔ', 'g': 'ㄕ', 'b': 'ㄖ',
  'y': 'ㄗ', 'h': 'ㄘ', 'n': 'ㄙ',
  'u': 'ㄧ', 'j': 'ㄨ', 'm': 'ㄩ',
  '8': 'ㄚ', 'i': 'ㄛ', 'k': 'ㄜ', ',': 'ㄝ',
  '9': 'ㄞ', 'o': 'ㄟ', 'l': 'ㄠ', '.': 'ㄡ',
  '0': 'ㄢ', 'p': 'ㄣ', ';': 'ㄤ', '/': 'ㄥ',
  '-': 'ㄦ',
  '6': 'ˊ', '3': 'ˇ', '4': 'ˋ', '7': '˙', ' ': ' '
};

export const ZHUYIN_TO_KEY: { [key: string]: string } = Object.fromEntries(
  Object.entries(KEY_TO_ZHUYIN).map(([key, zhuyin]) => [zhuyin, key])
);

export const FINGER_NAME_MAP = {
  thumb: '拇指',
  index: '食指',
  middle: '中指',
  ring: '無名指',
  pinky: '小指',
};

export const KEY_TO_FINGER_MAP: { [key: string]: FingerInfo } = {
  // Left Hand
  '`': { hand: 'left', finger: 'pinky' },
  '1': { hand: 'left', finger: 'pinky' },
  'q': { hand: 'left', finger: 'pinky' },
  'a': { hand: 'left', finger: 'pinky' },
  'z': { hand: 'left', finger: 'pinky' },
  'Tab': { hand: 'left', finger: 'pinky' },
  'CapsLock': { hand: 'left', finger: 'pinky' },
  'ShiftLeft': { hand: 'left', finger: 'pinky' },
  '2': { hand: 'left', finger: 'ring' },
  'w': { hand: 'left', finger: 'ring' },
  's': { hand: 'left', finger: 'ring' },
  'x': { hand: 'left', finger: 'ring' },
  '3': { hand: 'left', finger: 'middle' },
  'e': { hand: 'left', finger: 'middle' },
  'd': { hand: 'left', finger: 'middle' },
  'c': { hand: 'left', finger: 'middle' },
  '4': { hand: 'left', finger: 'index' },
  'r': { hand: 'left', finger: 'index' },
  'f': { hand: 'left', finger: 'index' },
  'v': { hand: 'left', finger: 'index' },
  '5': { hand: 'left', finger: 'index' },
  't': { hand: 'left', finger: 'index' },
  'g': { hand: 'left', finger: 'index' },
  'b': { hand: 'left', finger: 'index' },

  // Right Hand
  '6': { hand: 'right', finger: 'index' },
  'y': { hand: 'right', finger: 'index' },
  'h': { hand: 'right', finger: 'index' },
  'n': { hand: 'right', finger: 'index' },
  '7': { hand: 'right', finger: 'index' },
  'u': { hand: 'right', finger: 'index' },
  'j': { hand: 'right', finger: 'index' },
  'm': { hand: 'right', finger: 'index' },
  '8': { hand: 'right', finger: 'middle' },
  'i': { hand: 'right', finger: 'middle' },
  'k': { hand: 'right', finger: 'middle' },
  ',': { hand: 'right', finger: 'middle' },
  '9': { hand: 'right', finger: 'ring' },
  'o': { hand: 'right', finger: 'ring' },
  'l': { hand: 'right', finger: 'ring' },
  '.': { hand: 'right', finger: 'ring' },
  '0': { hand: 'right', finger: 'pinky' },
  'p': { hand: 'right', finger: 'pinky' },
  ';': { hand: 'right', finger: 'pinky' },
  '/': { hand: 'right', finger: 'pinky' },
  '-': { hand: 'right', finger: 'pinky' },
  '=': { hand: 'right', finger: 'pinky' },
  '[': { hand: 'right', finger: 'pinky' },
  ']': { hand: 'right', finger: 'pinky' },
  '\\': { hand: 'right', finger: 'pinky' },
  '\'': { hand: 'right', finger: 'pinky' },
  'Backspace': { hand: 'right', finger: 'pinky' },
  'Enter': { hand: 'right', finger: 'pinky' },
  'ShiftRight': { hand: 'right', finger: 'pinky' },

  // Thumbs
  ' ': { hand: 'right', finger: 'thumb' }
};

export const ZHUYIN_CONSONANTS = "ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ";
export const ZHUYIN_VOWELS = "ㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ";
export const ZHUYIN_TONES = "ˊˇˋ˙";

export const KEYBOARD_LAYOUT: string[][] = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['ShiftLeft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ShiftRight'],
  [' ']
];

export const SPECIAL_KEY_PROPS: { [key: string]: { label: string; widthClass: string; } } = {
  'Backspace': { label: 'Backspace', widthClass: 'w-24' },
  'Tab': { label: 'Tab', widthClass: 'w-16' },
  'CapsLock': { label: 'Caps Lock', widthClass: 'w-20' },
  'Enter': { label: 'Enter', widthClass: 'w-28' },
  'ShiftLeft': { label: 'Shift', widthClass: 'w-32' },
  'ShiftRight': { label: 'Shift', widthClass: 'w-36' },
  ' ': { label: '輕聲', widthClass: 'flex-grow' }
};
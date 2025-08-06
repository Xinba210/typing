export const speak = (text: string, enabled: boolean) => {
  if (!enabled) return;
  if ('speechSynthesis' in window) {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 0.8;
      utterance.pitch = 1;

      // Cancel any previous speech to prevent overlap
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  } else {
    console.error('Speech synthesis not supported in this browser.');
  }
};

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
export const recorder = new SpeechRecognition();

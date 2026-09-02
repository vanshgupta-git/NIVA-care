import { useState, useEffect, useCallback, useRef } from 'react';
import { Language } from '../types';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback((text: string, language: Language = 'en') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    // Cancel existing speech
    window.speechSynthesis.cancel();

    if (!text || text.trim() === '') {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set locale and voice preference
    let targetLang = 'en-IN';
    if (language === 'hi') targetLang = 'hi-IN';
    else if (language === 'ta') targetLang = 'ta-IN';
    else if (language === 'te') targetLang = 'te-IN';
    else targetLang = 'en-IN';

    utterance.lang = targetLang;
    utterance.rate = 0.95; // slightly deliberate for emergency clarity
    utterance.pitch = 1.0;

    // Attempt to pick a matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.replace('_', '-').startsWith(targetLang)) ||
                          voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notification:', e);
      setIsSpeaking(false);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech speak failed:', err);
      setIsSpeaking(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported
  };
}

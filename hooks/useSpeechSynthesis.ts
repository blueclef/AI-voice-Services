
import { useState, useEffect, useCallback } from 'react';
import { VoiceOption } from '../types';

interface SpeakParams {
  text: string;
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
}

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading voices initially
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      const synth = window.speechSynthesis;

      const loadVoices = () => {
        const voiceList = synth.getVoices();
        if (voiceList.length > 0) {
          setVoices(voiceList);
          setIsLoading(false);
        }
      };

      loadVoices();
      // Voices are loaded asynchronously. The 'voiceschanged' event fires when they are ready.
      synth.onvoiceschanged = loadVoices;

      return () => {
        synth.onvoiceschanged = null;
        synth.cancel(); // Clean up on unmount
      };
    } else {
        setIsLoading(false);
    }
  }, []);

  const speak = useCallback(({ text, voice, rate = 1, pitch = 1 }: SpeakParams) => {
    if (!supported || !text) return;
    
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice || null;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
  }, [supported]);

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [supported]);
  
  const pause = useCallback(() => {
    if (!supported || !isSpeaking || isPaused) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, [supported, isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (!supported || !isPaused) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, [supported, isPaused]);

  return { 
      voices, 
      speak, 
      cancel, 
      pause,
      resume,
      isLoading: isLoading || (supported && voices.length === 0), 
      isSpeaking,
      isPaused,
      supported
    };
};

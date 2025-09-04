
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import SettingsPanel from './components/SettingsPanel';
import AudioControls from './components/AudioControls';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';

// TypeScript declarations for global libraries from CDN
declare const marked: {
  parse: (markdown: string) => string;
};
declare const DOMPurify: {
  sanitize: (html: string) => string;
};

const App: React.FC = () => {
  const [text, setText] = useState<string>(
    '# AI 보이스 스튜디오\n\n안녕하세요, **AI 보이스 스튜디오**에 오신 것을 환영합니다. 여기에 텍스트를 입력하거나 붙여넣으면 *자연스러운* 목소리로 읽어드립니다.'
  );
  const [plainText, setPlainText] = useState<string>('');

  const {
    voices,
    speak,
    cancel,
    isLoading,
    isSpeaking,
    isPaused,
    resume,
    pause,
    supported,
  } = useSpeechSynthesis();

  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Convert markdown to plain text for speech synthesis
  useEffect(() => {
    if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined' && text) {
      const dirtyHtml = marked.parse(text);
      const sanitizedHtml = DOMPurify.sanitize(dirtyHtml);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sanitizedHtml;
      setPlainText(tempDiv.textContent || tempDiv.innerText || '');
    } else {
      setPlainText(text); // Fallback for when libraries aren't loaded or text is empty
    }
  }, [text]);

  // Set default voice once voices are loaded
  useEffect(() => {
    if (voices.length > 0 && !selectedVoiceURI) {
        const defaultVoice = 
            voices.find(v => v.lang === 'ko-KR' && v.name.includes('Google')) ||
            voices.find(v => v.lang === 'ko-KR') ||
            voices.find(v => v.default);
        
        if (defaultVoice) {
            setSelectedVoiceURI(defaultVoice.voiceURI);
        }
    }
  }, [voices, selectedVoiceURI]);

  const handleGenerate = useCallback(() => {
    if (isLoading || !plainText) return;
    const selectedVoice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    speak({ text: plainText, voice: selectedVoice, rate, pitch });

    // Simulate MP3 generation for download
    setAudioUrl(null); // Reset previous URL
    setTimeout(() => {
      // In a real app, this would come from a server API call.
      // We simulate it here for demonstration.
      const blob = new Blob([plainText], { type: 'audio/mp3' });
      setAudioUrl(URL.createObjectURL(blob));
    }, 1500); // Simulate network and processing delay

  }, [isLoading, plainText, voices, selectedVoiceURI, rate, pitch, speak]);

  if (!supported) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
        <div className="text-center p-8 bg-slate-800 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Browser Not Supported</h1>
          <p>Your browser does not support the Web Speech API. Please try Chrome or Firefox.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-grow flex flex-col gap-6 lg:gap-8 lg:w-3/5">
          <TextEditor
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <AudioControls
            onGenerate={handleGenerate}
            onPause={pause}
            onResume={resume}
            onCancel={cancel}
            isLoading={isLoading}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            audioUrl={audioUrl}
            textLength={text.length}
          />
        </div>
        <div className="lg:w-2/5">
          <SettingsPanel
            voices={voices}
            selectedVoiceURI={selectedVoiceURI}
            onVoiceChange={setSelectedVoiceURI}
            rate={rate}
            onRateChange={setRate}
            pitch={pitch}
            onPitchChange={setPitch}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

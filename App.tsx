
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import SettingsPanel from './components/SettingsPanel';
import AudioControls from './components/AudioControls';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';

const App: React.FC = () => {
  const [text, setText] = useState<string>(
    'Hello, welcome to AI Voice Studio. Type or paste your text here and I will read it for you in a natural voice.'
  );
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

  const handleGenerate = useCallback(() => {
    if (isLoading || !text) return;
    const selectedVoice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    speak({ text, voice: selectedVoice, rate, pitch });

    // Simulate MP3 generation for download
    setAudioUrl(null); // Reset previous URL
    setTimeout(() => {
      // In a real app, this would come from a server API call.
      // We simulate it here for demonstration.
      const blob = new Blob([text], { type: 'audio/mp3' });
      setAudioUrl(URL.createObjectURL(blob));
    }, 1500); // Simulate network and processing delay

  }, [isLoading, text, voices, selectedVoiceURI, rate, pitch, speak]);

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

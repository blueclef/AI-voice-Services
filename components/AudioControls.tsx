
import React, { useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, StopIcon, DownloadIcon, SparklesIcon } from './icons';

interface AudioControlsProps {
  onGenerate: () => void;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  isLoading: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  audioUrl: string | null;
  textLength: number;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  onGenerate,
  onPause,
  onResume,
  onCancel,
  isLoading,
  isSpeaking,
  isPaused,
  audioUrl,
  textLength
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);
  
  const isGenerateDisabled = isLoading || isSpeaking || textLength === 0;

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-4 space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
            onClick={onGenerate}
            disabled={isGenerateDisabled}
            className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400`}
        >
            <SparklesIcon className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Generating...' : 'Generate Audio'}
        </button>

        {isSpeaking && (
          <div className="flex items-center gap-2">
            {!isPaused ? (
              <button onClick={onPause} className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-yellow-500">
                <PauseIcon className="w-5 h-5 text-yellow-400" />
              </button>
            ) : (
               <button onClick={onResume} className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500">
                <PlayIcon className="w-5 h-5 text-green-400" />
              </button>
            )}
            <button onClick={onCancel} className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-500">
              <StopIcon className="w-5 h-5 text-red-400" />
            </button>
          </div>
        )}

        <div className="flex-grow">
          {audioUrl && (
            <div className="w-full flex items-center gap-4">
              <audio ref={audioRef} controls className="w-full h-10"></audio>
              <a
                href={audioUrl}
                download="speech.mp3"
                className="flex-shrink-0 inline-flex items-center justify-center p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500"
                aria-label="Download MP3"
              >
                <DownloadIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioControls;

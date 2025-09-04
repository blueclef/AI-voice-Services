
import React, { useMemo } from 'react';
import type { SpeechSynthesisVoice } from 'speechsynthesis';
import { AudioWaveformIcon, ChevronDownIcon } from './icons';

interface SettingsPanelProps {
  voices: SpeechSynthesisVoice[];
  selectedVoiceURI: string | null;
  onVoiceChange: (voiceURI: string) => void;
  rate: number;
  onRateChange: (rate: number) => void;
  pitch: number;
  onPitchChange: (pitch: number) => void;
  isLoading: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  voices,
  selectedVoiceURI,
  onVoiceChange,
  rate,
  onRateChange,
  pitch,
  onPitchChange,
  isLoading,
}) => {
  const languageGroups = useMemo(() => {
    const groups: { [key: string]: SpeechSynthesisVoice[] } = {};
    voices.forEach((voice) => {
      const lang = voice.lang.split('-')[0];
      if (!groups[lang]) {
        groups[lang] = [];
      }
      groups[lang].push(voice);
    });
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [voices]);

  const currentVoice = voices.find(v => v.voiceURI === selectedVoiceURI);

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6 space-y-6 h-full">
      <div className="flex items-center gap-3">
        <AudioWaveformIcon className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-slate-100">Voice Settings</h2>
      </div>

      {isLoading ? (
        <div className="text-center text-slate-400 py-10">Loading voices...</div>
      ) : (
        <>
          <div>
            <label htmlFor="voice-select" className="block text-sm font-medium text-slate-300 mb-2">
              Voice
            </label>
            <div className="relative">
              <select
                id="voice-select"
                value={selectedVoiceURI || ''}
                onChange={(e) => onVoiceChange(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 text-slate-200 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none transition"
              >
                <option value="" disabled>Select a voice</option>
                {languageGroups.map(([lang, voiceList]) => (
                  <optgroup label={lang.toUpperCase()} key={lang}>
                    {voiceList.map((voice) => (
                      <option key={voice.voiceURI} value={voice.voiceURI}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {currentVoice && <p className="text-xs text-slate-500 mt-2">Voice: {currentVoice.name} | Language: {currentVoice.lang}</p>}
          </div>

          <div>
            <label htmlFor="rate-slider" className="block text-sm font-medium text-slate-300 mb-2">
              Speed ({rate.toFixed(1)}x)
            </label>
            <input
              id="rate-slider"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => onRateChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="pitch-slider" className="block text-sm font-medium text-slate-300 mb-2">
              Pitch ({pitch.toFixed(1)})
            </label>
            <input
              id="pitch-slider"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => onPitchChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPanel;

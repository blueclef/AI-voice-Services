
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const BrainCircuitIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5a3 3 0 1 0-5.993 1.003" />
    <path d="M12 5a3 3 0 1 0 5.993 1.003" />
    <path d="M12 19a3 3 0 1 0-5.993-1.003" />
    <path d="M12 19a3 3 0 1 0 5.993-1.003" />
    <path d="M5 12a3 3 0 1 0-1.003-5.993" />
    <path d="M19 12a3 3 0 1 0 1.003-5.993" />
    <path d="M5 12a3 3 0 1 0-1.003 5.993" />
    <path d="M19 12a3 3 0 1 0 1.003 5.993" />
    <path d="M12 12v.01" />
    <path d="M12 12h.01" />
    <path d="M12 12v-.01" />
    <path d="M12 12h-.01" />
    <path d="m14.5 9.5 3-3" />
    <path d="m9.5 14.5-3 3" />
    <path d="m14.5 14.5 3-3" />
    <path d="m9.5 9.5-3-3" />
  </svg>
);

export const AudioWaveformIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12h2" />
    <path d="M6 8v8" />
    <path d="M10 5v14" />
    <path d="M14 8v8" />
    <path d="M18 10v4" />
    <path d="M22 12h-2" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export const StopIcon: React.FC<IconProps> = (props) => (
    <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="1"
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <rect x="4" y="4" width="16" height="16" />
    </svg>
);


export const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z"/>
  </svg>
);

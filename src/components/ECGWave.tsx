import React from 'react';

interface ECGWaveProps {
  color?: string;
  height?: number;
  animated?: boolean;
}

export const ECGWave: React.FC<ECGWaveProps> = ({
  color = '#06B6D4',
  height = 28,
  animated = true
}) => {
  return (
    <div className="w-full overflow-hidden flex items-center opacity-75">
      <svg
        viewBox="0 0 500 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full ${animated ? 'animate-pulse' : ''}`}
        style={{ height: `${height}px`, animationDuration: '2.5s' }}
      >
        <path
          d="M0 20 H120 L130 12 L140 28 L150 5 L160 35 L170 18 L180 22 L190 20 H310 L320 12 L330 28 L340 5 L350 35 L360 18 L370 22 L380 20 H500"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

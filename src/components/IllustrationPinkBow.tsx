import React from 'react';
import bowPinkPng from '../assets/bow-pink.png';

interface IllustrationPinkBowProps {
  className?: string;
  isOpen?: boolean;
}

export const IllustrationPinkBow: React.FC<IllustrationPinkBowProps> = ({
  className = '',
  isOpen = false,
}) => {
  return (
    <div
      className={`relative select-none transition-transform duration-500 group-hover:scale-105 group-active:scale-95 ${className}`}
      style={{
        filter:
          'drop-shadow(0 20px 32px rgba(116, 38, 61, 0.38)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.12))',
      }}
    >
      {/* Imported PNG bow exactly matching the uploaded artwork with transparent background */}
      <img
        src={bowPinkPng}
        alt="Chiếc nơ hồng xinh xắn"
        className="w-76 h-auto sm:w-96 md:w-[440px] max-w-[94vw] max-h-[65vh] object-contain pointer-events-none select-none transition-transform duration-300"
        draggable={false}
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'petal' | 'heart';
}

export const FallingPetals: React.FC = () => {
  const [elements, setElements] = useState<Petal[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Generate gentle petals
    const newItems: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.random() * 12 + 10, // 10px to 22px
      duration: Math.random() * 7 + 8, // 8s to 15s
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.3,
      type: Math.random() > 0.4 ? 'petal' : 'heart',
    }));
    setElements(newItems);
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute will-change-transform"
          style={{
            left: `${el.left}%`,
            top: '-30px',
            animation: `fallingPetal ${el.duration}s linear ${el.delay}s infinite`,
            opacity: el.opacity,
          }}
        >
          {el.type === 'petal' ? (
            <svg
              width={el.size}
              height={el.size * 1.3}
              viewBox="0 0 24 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#E8A598] drop-shadow-sm transform rotate-12"
            >
              <path
                d="M12 0C18 10 24 18 20 26C16 34 8 32 4 26C0 20 6 10 12 0Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width={el.size * 0.8}
              height={el.size * 0.8}
              viewBox="0 0 24 24"
              fill="#ECA89D"
              className="drop-shadow-sm opacity-70"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}
      <style>{`
        @keyframes fallingPetal {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
          }
          33% {
            transform: translateY(35vh) rotate(120deg) translateX(25px);
          }
          66% {
            transform: translateY(70vh) rotate(240deg) translateX(-20px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(15px);
          }
        }
      `}</style>
    </div>
  );
};

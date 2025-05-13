'use client';

import { useRef } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error('Audio play failed:', err);
      });
    }
    
  };

  return (
    <div className="p-4">
      <button
        onClick={handlePlay}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Play Sound
      </button>

      <audio ref={audioRef} src="/sound.mp3" />
    </div>
  );
}
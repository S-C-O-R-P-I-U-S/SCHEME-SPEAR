'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export default function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetweenWords = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(targetWord.substring(0, currentText.length + 1));
        if (currentText.length + 1 === targetWord.length) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        setCurrentText(targetWord.substring(0, currentText.length - 1));
        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className="inline-block font-mono text-[#00E5CC]">
      {currentText}
      <span className="animate-pulse text-[#FFB800] font-normal">|</span>
    </span>
  );
}

'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

export default function Counter({ end, duration = 2000, suffix = '', decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // EaseOutExpo formula
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(easeProgress * end);
            
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="font-mono">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

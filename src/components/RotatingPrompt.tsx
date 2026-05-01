'use client';

import { useEffect, useState } from 'react';

interface Props {
  prompts: string[];
  intervalMs?: number;
  className?: string;
}

export default function RotatingPrompt({
  prompts,
  intervalMs = 4500,
  className = '',
}: Props) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prompts.length <= 1) return;
    const tick = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % prompts.length);
        setVisible(true);
      }, 600);
      return () => clearTimeout(swap);
    }, intervalMs);
    return () => clearInterval(tick);
  }, [prompts.length, intervalMs]);

  return (
    <span
      className={`inline-block transition-all duration-700 ease-in-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${className}`}
    >
      {prompts[index]}
    </span>
  );
}

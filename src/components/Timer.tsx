import { useEffect, useState } from "react";

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  isActive: boolean;
}

const Timer = ({ timeLeft, totalTime, isActive }: TimerProps) => {
  const [key, setKey] = useState(0);
  
  // Trigger animation on time change
  useEffect(() => {
    if (isActive) {
      setKey((prev) => prev + 1);
    }
  }, [timeLeft, isActive]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-40 h-40 -rotate-90" viewBox="0 0 140 140">
        {/* Background circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="progress-ring"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          key={key}
          className={`font-display text-5xl font-bold text-primary ${
            isActive ? "animate-countdown" : ""
          }`}
        >
          {timeLeft}
        </span>
        <span className="text-muted-foreground text-sm uppercase tracking-wider">
          seconds
        </span>
      </div>
    </div>
  );
};

export default Timer;

import { useState, useCallback, useEffect, useRef } from "react";

const BEST_SCORE_KEY = "click-test-best-cps";

export type TestStatus = "idle" | "active" | "finished";

interface UseClickTestReturn {
  status: TestStatus;
  clickCount: number;
  timeLeft: number;
  selectedDuration: number;
  cps: number;
  bestCps: number;
  setSelectedDuration: (duration: number) => void;
  handleClick: () => void;
  resetTest: () => void;
}

export const useClickTest = (): UseClickTestReturn => {
  const [status, setStatus] = useState<TestStatus>("idle");
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [bestCps, setBestCps] = useState(() => {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    return stored ? parseFloat(stored) : 0;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Calculate CPS
  const cps = status === "finished" 
    ? Math.round((clickCount / selectedDuration) * 10) / 10 
    : 0;

  // Update best score when test finishes
  useEffect(() => {
    if (status === "finished" && cps > bestCps) {
      setBestCps(cps);
      localStorage.setItem(BEST_SCORE_KEY, cps.toString());
    }
  }, [status, cps, bestCps]);

  // Timer logic
  useEffect(() => {
    if (status === "active") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setStatus("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  const handleClick = useCallback(() => {
    if (status === "idle") {
      setStatus("active");
      setTimeLeft(selectedDuration);
      startTimeRef.current = Date.now();
      setClickCount(1);
    } else if (status === "active") {
      setClickCount((prev) => prev + 1);
    }
    // Ignore clicks when finished
  }, [status, selectedDuration]);

  const resetTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setStatus("idle");
    setClickCount(0);
    setTimeLeft(selectedDuration);
    startTimeRef.current = null;
  }, [selectedDuration]);

  const handleDurationChange = useCallback((duration: number) => {
    setSelectedDuration(duration);
    setTimeLeft(duration);
    if (status !== "idle") {
      resetTest();
    }
  }, [status, resetTest]);

  return {
    status,
    clickCount,
    timeLeft,
    selectedDuration,
    cps,
    bestCps,
    setSelectedDuration: handleDurationChange,
    handleClick,
    resetTest,
  };
};

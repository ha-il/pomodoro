import { useEffect, useState } from "react";

const DEFAULT_MINUTES = 1;
const DEFAULT_SECONDS = 5;

export default function useTimer() {
  const [minute, setMinute] = useState(DEFAULT_MINUTES);
  const [second, setSecond] = useState(0);
  const [round, setRound] = useState(0);
  const [goal, setGoal] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const updateTimer = () => {
    setSecond((prevSecond) => {
      if (prevSecond > 0) return prevSecond - 1;
      setMinute((prevMinute) => {
        if (prevMinute > 0) return prevMinute - 1;
        setRound((prevRound) => {
          if (prevRound < 4) return prevRound + 1;
          setGoal((prevGoal) => prevGoal + 1);
          return 0;
        });
        return DEFAULT_MINUTES;
      });
      return DEFAULT_SECONDS;
    });
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying && goal < 12) {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, minute, second, round, goal]);

  return { minute, second, round, goal, isPlaying, setIsPlaying };
}

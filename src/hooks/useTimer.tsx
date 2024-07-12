import { useEffect, useState } from "react";

export default function useTimer() {
  const [minute, setMinute] = useState(1);
  const [second, setSecond] = useState(0);
  const [round, setRound] = useState(0);
  const [goal, setGoal] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setSecond((prevSecond) => {
          if (prevSecond === 0) {
            if (minute === 0) {
              if (round === 3) {
                setGoal((prevGoal) => prevGoal + 1);
                setRound(0);
                setMinute(25);
                setSecond(0);
              } else {
                setRound((prevRound) => prevRound + 1);
                setMinute(25);
                setSecond(0);
              }
            } else {
              setMinute((prevMinute) => prevMinute - 1);
              return 59;
            }
          } else {
            return prevSecond - 1;
          }
          return prevSecond;
        });
      }, 1000);
    } else if (!isPlaying && minute !== 0 && second !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, minute, second, round, goal]);

  return { minute, second, round, goal, isPlaying, setIsPlaying };
}

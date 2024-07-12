import styled from "styled-components";
import useTimer from "../hooks/useTimer";
import { motion } from "framer-motion";
import { PauseIcon } from "./icons/PauseIcon";
import { PlayIcon } from "./icons/PlauIcon";

export default function Timer() {
  const { goal, isPlaying, minute, round, second, setIsPlaying } = useTimer();
  const handleBtnClick = () => {
    setIsPlaying((c) => !c);
  };
  return (
    <Container>
      <Title>Pomodoro</Title>
      <TimerDisplay>
        <TimeUnit key={minute} initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
          {String(minute).padStart(2, "0")}
        </TimeUnit>
        <span>:</span>
        <TimeUnit key={second} initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
          {String(second).padStart(2, "0")}
        </TimeUnit>
      </TimerDisplay>
      <Button onClick={handleBtnClick} whileHover={{ scale: 1.2 }}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </Button>
      <ProgressDisplay>
        <ProgressUnit>
          <ProgressValue>{round}/4</ProgressValue>
          <div>ROUND</div>
        </ProgressUnit>
        <ProgressUnit>
          <ProgressValue>{goal}/12</ProgressValue>
          <div>GOAL</div>
        </ProgressUnit>
      </ProgressDisplay>
    </Container>
  );
}

const Title = styled.h1`
  color: white;
  font-size: 4rem;
  font-weight: 700;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: space-around;
  background-color: #e74c3c;
`;

const TimerDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
  font-weight: 700;
  font-size: 3rem;
`;

const TimeUnit = styled(motion.div)`
  display: flex;
  box-shadow: 4px 4px 8px gray;
  width: 12rem;
  height: 16rem;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 4rem;
  color: #e74c3c;
  font-weight: 700;
`;

const Button = styled(motion.button)`
  width: 8rem;
  height: 8rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border: none;
  color: white;
  padding: 2rem;
`;

const ProgressDisplay = styled.div`
  display: flex;
  gap: 5rem;
`;

const ProgressUnit = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 1.2rem;
`;

const ProgressValue = styled.div`
  opacity: 0.7;
  font-size: 1.5rem;
`;

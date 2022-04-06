import React, { useEffect } from "react";

interface ScoreboardNode {
  seconds: number;
  setSeconds: (seconds: number) => void;
  isActive: boolean;
}

const Scoreboard: React.FC<ScoreboardNode> = ({
  seconds,
  setSeconds,
  isActive,
}) => {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="time z-10 text-2xl fixed top-0 bg-neutral-700 text-white w-max px-2 rounded-b-xl text-center">
      Time:{" "}
      <strong className="bg-neutral-500 px-1 rounded-full">{seconds}s</strong>
    </div>
  );
};

export default Scoreboard;

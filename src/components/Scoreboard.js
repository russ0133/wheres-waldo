import React, { useEffect, useState } from "react";
import { toDate, format, differenceInMilliseconds } from "date-fns";
import { updateBestScore } from "../firebase";

const Scoreboard = ({ seconds, setSeconds, isActive, tryUpdatingScore }) => {
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
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

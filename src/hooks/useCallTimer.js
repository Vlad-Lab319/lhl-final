import { useCallback, useRef, useState } from "react";

export function useCallTimer() {
  const [callTimer, setCallTimer] = useState("00:00");
  const intervalID = useRef();

  const startTimer = useCallback(() => {
    let min = 0;
    let sec = 0;
    intervalID.current = window.setInterval(() => {
      if (sec === 59) {
        sec = 0;
        min++;
      } else {
        sec++;
      }

      const secStr = sec.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      const minStr = min.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      setCallTimer(`${minStr}:${secStr}`);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalID.current) {
      clearInterval(intervalID.current);
    }
  }, []);

  return { callTimer, startTimer, stopTimer };
}

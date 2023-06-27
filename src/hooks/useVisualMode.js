import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setMode(newMode)
    setHistory(prevHistory => [...prevHistory, newMode])
  };

  //checks if the history array has more than one item. If it does, it creates a new updatedHistory array by excluding the last item using slice().
  const back = () => {
    if (history.length > 1) {
      const updatedHistory = history.slice(0, -1);
      setMode(updatedHistory[updatedHistory.length - 1]);
      setHistory(updatedHistory);
    }
  }

  return {
    mode,
    transition,
    back
  };

}


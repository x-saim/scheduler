import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  /**
 * Transitions to a new mode and updates the history.
 * @param {string} newMode - The new mode to transition to.
 * @param {boolean} [replace=false] - Flag indicating whether to replace the last mode in history.
 */
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory[updatedHistory.length - 1] = newMode;
        return updatedHistory;
      })
    } else {
      setHistory(prevHistory => [...prevHistory, newMode])
    }
    setMode(newMode)
  }

  /**
 * Navigates back to the previous mode in history.
 */
  const back = () => {
    if (history.length > 1) {
      const updatedHistory = [...history];
      updatedHistory.pop(); // Remove the last mode from history
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
import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    /*using previous state value of history. Updates last element of updatedHistory to newMode by accessing the last index of updatedHistory array.Lastly, the updated updatedHistory array is returned from the callback function, which will be used by setHistory to update the state value of history.*/

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

  //checks if the history array has more than one item. If it does, it creates a new updatedHistory array by excluding the last item using slice().
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
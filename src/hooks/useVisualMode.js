import { useState } from 'react';

// Hook to help navigate through pages shown through user interaction
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Shows the next expected page
  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode);

    } else {
      
      history.push(mode);
      setHistory(history);
      setMode(history[history.length - 1]);
    }
  };

  // Returns user to the previous page
  function back() {
    if (history.length > 1) {
    history.pop();
    setHistory(history);
    setMode(history[history.length - 1]);
    }

  };

  return { mode, transition, back };
}


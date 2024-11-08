// Counter.js
import React, { useState, useEffect } from 'react';

const Counter = ({ targetNumber, title, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = targetNumber / (duration / 50);

    const counter = setInterval(() => {
      setCount((prevCount) => {
        const nextCount = prevCount + increment;
        if (nextCount >= targetNumber) {
          clearInterval(counter);
          return targetNumber;
        }
        return nextCount;
      });
    }, 50);

    return () => clearInterval(counter);
  }, [targetNumber, duration]);

  return (
    <div className="counter">
      <div className="counter-value">{Math.round(count)}</div>
      <div className="counter-title">{title}</div>
    </div>
  );
};

export default Counter;
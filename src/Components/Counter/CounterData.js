// CounterData.js
import React from 'react';
import Counter from './Counter';
import './Counter.css';

export const CounterData = [
  {
    count: 100000,
    title: 'Total order delivered',
  },
  {
    count: 4000,
    title: 'Unique customers',
  },
  {
    count: 2000,
    title: 'Repeated customers',
  },
  {
    count: 45,
    title: 'Small businesses',
  },
];

const CounterRow = () => {
  return (
    <div className="counter-row">
      {CounterData.map((data, index) => (
        <Counter
          key={index}
          targetNumber={data.count}
          title={data.title}
          duration={3000}
        />
      ))}
    </div>
  );
};

export default CounterRow;
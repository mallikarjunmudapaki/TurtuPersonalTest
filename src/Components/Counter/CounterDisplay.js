import Counter from './Counter.js';
import { CounterData } from './CounterData.js';
import './Counter.css';

export default function CounterDisplay(){
    return(
        <>
        <div className="counter-display container">
        {CounterData.map((counter, index) => (
          <Counter key={index} count={counter.count} title={counter.title} />
        ))}
      </div>
        </>
    )
}
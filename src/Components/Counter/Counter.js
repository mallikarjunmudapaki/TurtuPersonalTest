import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import '../Counter/Counter.css';
export default function Counter({ count, title }) {
    useEffect(()=>{
        Aos.init({duration:'1000'})
      })
    
    return (

        <section className="counter-section pb-5 pt-5">
            <div className='counter'>
                <div className="cards">
                    <h3>{count}</h3>
                    <p>{title}</p>
                </div>
            </div>

        </section>

    );
}
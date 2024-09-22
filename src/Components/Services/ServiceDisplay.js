import Services from './Services.js';
import './Services.css'
export default function ServiceDisplay(){
    return(
        <>
        <div>
      <header className="header-service text-center">
        <h2>Services</h2>
      </header>
      <Services/>
      </div>
      </>
    );
  }
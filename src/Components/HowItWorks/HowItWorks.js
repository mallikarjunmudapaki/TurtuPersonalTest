import work from '../../Images/HowItWork.png';
import workweb from '../../Images/Howitworkweb.png';
import './HowItWorks.css';
export default function HowItWorks(){
    return(
        <>
        <div className="works">
        <div className="outer-item text-center" data-aos="fade-up">
          <h2>How it works</h2>
        </div>
        <div className='container works-container'>
        <div className="inner-item" data-aos="zoom-in-up">
          <img
            src={workweb}
            className="img-work"
            alt="..."
            id="web"
          />
          <img src={work} className="img-fluid" alt="about" id='mobile' />
        </div>
      </div>
      </div>
        </>
    )
}
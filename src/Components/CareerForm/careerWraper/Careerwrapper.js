import React, { useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Outlet, useLocation } from 'react-router-dom';
import './Careerwrapper.css';

const CareerWrapper = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="slide"
        timeout={300}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="transition-wrapper">
          <Outlet />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default CareerWrapper;

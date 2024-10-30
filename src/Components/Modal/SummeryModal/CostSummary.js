
// export default InfoModal;
import React from 'react';
import Modal from 'react-modal';
import './CostSummary.css'

Modal.setAppElement('#root'); // Bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

const InfoModal = ({ isOpen, onClose, pricingInfo }) => {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',  // Adjust width as needed
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }
      };

  return (
    <Modal isOpen={isOpen}   style={customStyles} onRequestClose={onClose} contentLabel="Pricing Information">
      <div className="oM-modal-header">
        <h2>Pricing Information</h2>
        <button onClick={onClose} className="oM-close-button">&times;</button>
      </div>
      <div className="oM-modal-body">
        <p>Base Fare (up to 3 km): {pricingInfo.baseFare}</p>
        <p>Per km price: {pricingInfo.extraFarePerKm}</p>
        <p>Weight Cost: {pricingInfo.weightFare}</p>
      </div>
    </Modal>
  );
};

export default InfoModal;

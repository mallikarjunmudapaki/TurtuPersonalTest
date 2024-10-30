import React from 'react';
import Modal from 'react-modal';
import './PaymentConfirmModal.css';  // Create and import a CSS file for modal styling

const PaymentStatusModal = ({ isOpen, onRequestClose, paymentSuccess, handleRetry, handleReturnHome }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="oM-Modal"
      overlayClassName="oM-Overlay"
    >
      <div className="oM-modal-content">
        <h2>{paymentSuccess ? 'Your order has been successfully submitted!' : 'There was an error placing your order.'}</h2>
        <button className="oM-modal-button" onClick={paymentSuccess ? handleReturnHome : handleRetry}>
          {paymentSuccess ? 'Return Home' : 'Retry'}
        </button>
      </div>
    </Modal>
  );
};

export default PaymentStatusModal;

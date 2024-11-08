import React, { useEffect, useState } from 'react';
import './CakeDeliveryalert.css'; // Import the custom CSS for styling

const CakeDeliveryalert = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
  }, []);

  return (
    showAlert && (
      <div className="custom-alert">
        <div className="custom-alert-content">
          <strong>Notice:</strong> Please do not send cakes here. For cake delivery, call us at
          <a href="tel:+917975443090" className="custom-alert-link"> +91 7975443090</a>
          <button
            type="button"
            className="custom-alert-close"
            onClick={() => setShowAlert(false)}
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default CakeDeliveryalert;

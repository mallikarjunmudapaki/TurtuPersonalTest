import React, { useState } from 'react';
import axios from 'axios';
import '../../Pages/ResetPasswordEmail/ResetPasswordEmail.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new FormData object to handle the email submission
    const formData = new FormData();
    formData.append('email', email);
  
    axios.post('http://13.235.115.160:5000/api/request_password_reset', formData)
      .then(response => {
        if (response.status === 200) {
          setMessage('A reset password link has been sent to your email. Please check your inbox.');
          setError('');
        } else {
          setError('Failed to send reset link. Please try again.');
          setMessage('');
        }
      })
      .catch(err => {
        setError('Error sending reset link. Make sure the email is registered.');
        setMessage('');
      });
  };
  
  return (
    <div className="email-container">
      <form className="email-form" onSubmit={handleSubmit}>
        <div className="email-form-group">
          <div className="email-label">
            <label>Enter Email Id:</label>
          </div>
          <input
            className="email-input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
        </div>

        {/* Display success or error messages */}
        {message && <div className="success-message">{message}</div>}
        {error && <div className="email-error">{error}</div>}

        <button className="email-submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
}

// import React, { useState } from 'react';
// import axios from 'axios';
// import '../../Pages/ResetPasswordEmail/ResetPasswordEmail.css';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Create a new FormData object
//     const formData = new FormData();
//     formData.append('email', email);
  
//     axios.post('http://13.235.115.160:5000/api/request_password_reset', formData)
//       .then(response => {
//         setMessage('A reset password link has been sent to your email.');
//         setError('');
//       })
//       .catch(err => {
//         setError('Error sending reset link. Make sure the email is registered.');
//         setMessage('');
//       });
//   };
  
//   return (

//    <div className="email-container">
//    <form className="email-form" onSubmit={handleSubmit}>
//      <div className="email-form-group">
//        <div className="email-label">
//          <label>Enter Email Id:</label>
//        </div>
//        <input
//          className="email-input"
//          type="email"
//          name="email"
//          value={email}
//          onChange={handleChange}
//          placeholder="Enter Email"
//          required
//        />
//      </div>
//      {message && <div className="success-message">{message}</div>}
//         {error && <div className="email-error">{error}</div>}
//      <button className="email-submit-button" type="submit">Submit</button>
//    </form>
//  </div>
//   );
// }

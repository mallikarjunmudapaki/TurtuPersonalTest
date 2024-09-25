// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // useParams for getting token from URL
// import axios from 'axios';
// import '../../Pages/ResetPassword/ResetPassword.css';


// export default function ResetPassword() {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const { token } = useParams(); // Extract token from URL params
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     axios.post(`http://13.235.115.160:5000/api/reset_password/<token>`, { password })
//       .then(response => {
//         setMessage('Password has been successfully reset. Redirecting to login...');
//         setError('');
//         setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
//       })
//       .catch(err => {
//         setError('Failed to reset password. Invalid or expired token.');
//         setMessage('');
//       });
//   };

//   return (
//     <div className="reset-password-container">
//       <h2 className="reset-password-title">Reset Password</h2>
//       <form className="reset-password-form" onSubmit={handleSubmit}>
//         <div className="reset-password-form-group">
//           <div className="reset-password-label">
//           <label htmlFor="password">New Password</label>
//           </div>
//             <input
//             className="reset-password-input"
//             type="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter new password"
//             required
//           />
          
//         </div>
//         <div className="reset-password-form-group">
//           <div className="reset-password-label">
//           <label htmlFor="confirmPassword">Confirm New Password</label>
//           </div>
//           <input
//             className="reset-password-input"
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Confirm new password"
//             required
//           />
//         </div>
//         {message && <div className="success-message">{message}</div>}
//         {error && <div className="reset-password-error">{error}</div>}
//         <button className="reset-password-button" type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams for getting token from URL
import axios from 'axios';
import '../../Pages/ResetPassword/ResetPassword.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Extract token from URL params
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    axios.post(`http://13.235.115.160:5000/api/reset_password/${token}`, { password })
      .then(response => {
        setMessage('Password has been successfully reset. Redirecting to login...');
        console.log(token);
        setError('');
        setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
      })
      .catch(err => {
        setError('Failed to reset password. Invalid or expired token.');
        setMessage('');
      });
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-title">Reset Password</h2>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <div className="reset-password-form-group">
          <div className="reset-password-label">
            <label htmlFor="password">New Password</label>
          </div>
          <input
            className="reset-password-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="reset-password-form-group">
          <div className="reset-password-label">
            <label htmlFor="confirmPassword">Confirm New Password</label>
          </div>
          <input
            className="reset-password-input"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="reset-password-error">{error}</div>}
        <button className="reset-password-button" type="submit">Reset Password</button>
      </form>
    </div>
  );
}

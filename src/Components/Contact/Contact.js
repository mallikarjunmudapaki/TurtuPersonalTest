import { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import, ensure you install this using `npm install jwt-decode`
import './Contact.css'; // Your CSS file for styling

export default function Contact() {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    phone_number: '',
    queries: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(''); // Message state for showing feedback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = validate(formValues);
    setFormErrors(errors);

    // If no validation errors, proceed to verify token and email
    if (Object.keys(errors).length === 0) {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
          setMessage('Please log in to submit the form.');
          return;
        }

        // Decode the token to get the user's email
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email; // Ensure the token contains the email field
        
        console.log('Decoded email:', email); // Debugging statement

        // Verify the email with the backend
        const verifyResponse = await axios.post(
          'http://13.235.115.160:5000/api/verify_email', // Endpoint for verifying if the email exists in the DB
          { email },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Check if the email exists in the database
        if (verifyResponse.data.status === 'success' && verifyResponse.data.isVerified) {
          // Email exists; proceed with form submission
          await axios.post(
            'http://13.235.115.160:5000/api/contact',
            formValues,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include the JWT token for submission
              },
            }
          );

          // Clear the form and show success message
          setFormValues({ username: '', email: '', phone_number: '', queries: '' });
          setIsSuccess(true);
          setMessage('Your message has been sent! A confirmation email has been sent to you.');
          setTimeout(() => setIsSuccess(false), 5000); // Hide success message after 5 seconds
        } else {
          // If the email is not verified or doesn't exist in the DB
          setMessage('Please log in to submit the form.');
        }
      } catch (error) {
        // Handle errors more effectively
        console.error('Error during verification or form submission:', error);
        if (error.response) {
          setMessage(`Error: ${error.response.data.message || 'Failed to verify or submit the form.'}`);
        } else if (error.request) {
          setMessage('No response from the server. Please try again later.');
        } else {
          setMessage('An error occurred during submission.');
        }
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is not valid';
    }
    if (!values.phone_number) {
      errors.phone_number = 'Phone number is required';
    } else if (!/^\d{10}$/.test(values.phone_number)) {
      errors.phone_number = 'Phone number must be exactly 10 digits';
    }
    if (!values.queries) {
      errors.queries = 'Query is required';
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Us</h2>
      {message && <p className="error-message">{message}</p>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formValues.username}
          onChange={handleChange}
        />
        <p className="error-message">{formErrors.username}</p>
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email ID"
          value={formValues.email}
          onChange={handleChange}
        />
        <p className="error-message">{formErrors.email}</p>
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          placeholder="Enter phone number"
          value={formValues.phone_number}
          onChange={handleChange}
        />
        <p className="error-message">{formErrors.phone_number}</p>
      </div>
      <div>
        <label>Query:</label>
        <textarea
          name="queries"
          placeholder="Enter your query"
          value={formValues.queries}
          onChange={handleChange}
        ></textarea>
        <p className="error-message">{formErrors.queries}</p>
      </div>
      <button type="submit">Submit</button>
      {isSuccess && <p className="success-message">Message sent successfully!</p>}
    </form>
  );
}


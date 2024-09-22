import { useState } from 'react';
import axios from 'axios';
import './Contact.css'; // Import your CSS file for styling

export default function Contact() {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    phone_number: '',
    queries: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(''); // To show messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = validate(formValues);
    setFormErrors(errors);

    // If no validation errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('authToken');

        // Send the form data with Authorization header
        await axios.post(
          'http://13.235.115.160:5000/api/contact',
          formValues,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Correctly format the Bearer token
            },
          }
        );

        // Clear the form and show success message
        setFormValues({ username: '', email: '', phone_number: '', queries: '' });
        setIsSuccess(true);
        setMessage('Your message has been sent! A confirmation email has been sent to you.');
        setTimeout(() => setIsSuccess(false), 5000); // Hide success message after 5 seconds
      } catch (error) {
        // Handle errors more effectively
        console.error('Error submitting the form:', error);
        if (error.response) {
          // The request was made, and the server responded with a status code
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          setMessage(`Error: ${error.response.data.message || 'Failed to submit the form.'}`);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('Error request:', error.request);
          setMessage('No response from the server. Please try again later.');
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
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


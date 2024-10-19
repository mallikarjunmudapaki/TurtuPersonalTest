import { useState } from 'react';
import axios from 'axios';
import './Contact.css'; 
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    phone_number: '',
    queries: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form inputs
    const errors = validate(formValues);
    setFormErrors(errors);
  
    // If no validation errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      try {
        // Submit the form values to the backend
        await axios.post(
          
          `${process.env.REACT_APP_API_BASE_URL}/api/contact`, // Replace with your actual backend endpoint
          formValues,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        // Clear the form and show success message
        setFormValues({ username: '', email: '', phone_number: '', queries: '' });
        setIsSuccess(true);
        setMessage('Your message has been sent! A confirmation email has been sent to you.');
  
        // Hide the success message after 5 seconds and reset the message state
        setTimeout(() => {
          setIsSuccess(false);
          setMessage(''); // Clear the message to prevent it from showing again
        }, 5000); // Hide success message after 5 seconds
  
      } catch (error) {
        // Handle errors during submission
        console.error('Error during form submission:', error);
        if (error.response) {
          setMessage(`Error: ${error.response.data.message || 'Failed to submit the form.'}`);
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
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className='contact-section'>
        <button className="back-button" onClick={handleBackClick}>
            <FaArrowLeft /> Back
          </button>
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Us</h2>
      {message && <p className={isSuccess ? 'success-message' : 'error-message'}>{message}</p>}
      <div className='contact-input-field'>
        <label>Username:</label>
        <input
        className='contact-input'
          type="text"
          name="username"
          placeholder="Enter username"
          value={formValues.username}
          onChange={handleChange}
          required
        />
        <p className="error-message">{formErrors.username}</p>
      </div>
      <div className='contact-input-field'>
        <label>Email:</label>
        <input
        className='contact-input'
          type="email"
          name="email"
          placeholder="Enter email ID"
          value={formValues.email}
          onChange={handleChange}
          required
        />
        <p className="error-message">{formErrors.email}</p>
      </div>
      <div className='contact-input-field'>
        <label>Phone Number:</label>
        <input
        className='contact-input'
          type="text"
          name="phone_number"
          placeholder="Enter phone number"
          value={formValues.phone_number}
          onChange={handleChange}
          required
        />
        <p className="error-message">{formErrors.phone_number}</p>
      </div>
      <div className='contact-input-field'>
        <label>Query:</label>
        <textarea
        className='contact-input'
          name="queries"
          placeholder="Enter your query"
          value={formValues.queries}
          onChange={handleChange}
          required
        ></textarea>
        <p className="error-message">{formErrors.queries}</p>
      </div>
      <button type="submit" className='contact-btn'>Submit</button>
      {/*isSuccess && <p className="success-message">Message sent successfully!</p>*/}
    </form>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Career.css';
import Header from '../../Components/Header/Header';

const Career = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
    profile: '',
    resume_filename: null,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState(null);


  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
    setErrors({ ...errors, [name]: '' }); // Clear error on input change
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!formData.phone_number) {
      newErrors.phone_number = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Phone number must be exactly 10 digits.';
    }

    if (!formData.profile) {
      newErrors.profile = 'Please select a profile.';
    }

    if (!formData.resume_filename) {
      newErrors.resume_filename = 'Please upload a resume in PDF, DOC, or DOCX format.';
    } else if (!/\.(pdf|doc|docx)$/i.test(formData.resume_filename.name)) {
      newErrors.resume_filename = 'Invalid file format. Only PDF, DOC, and DOCX files are allowed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    console.log('Token from localStorage:', savedToken);  // Debugging token fetched from localStorage
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  
    console.log('Token before submitting form:', token);  // Debugging token before submission
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('phone_number', formData.phone_number);
    formDataToSubmit.append('profile', formData.profile);
    formDataToSubmit.append('resume', formData.resume_filename);
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/career`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Attach the token here
        },
      });
  
      console.log('Response from backend:', response);  // Debugging the response
  
      if (response.status === 201) {
        const { user_data } = response.data.data;
        console.log('Decoded user data:', user_data);  // Check user data from the response
  
        setSuccessMessage('Application submitted successfully!');
        setFormData({ email: '', phone_number: '', profile: '', resume_filename: null });
        setErrors({});
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error response:', error);  // Debugging error response
      if (error.response && error.response.data) {
        setErrors({ ...errors, apiError: error.response.data.message });
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };
  // // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   if (!token) {
  //     setErrors({ form: 'You must be logged in to submit the form.' });
  //     return;
  //   }

  //   try {
  //     // Create form data to send to the backend
  //     const formDataToSend = new FormData();
  //     formDataToSend.append('email', formData.email);
  //     formDataToSend.append('phone_number', formData.phone_number);
  //     formDataToSend.append('profile', formData.profile);
  //     formDataToSend.append('resume_filename', formData.resume_filename);

  //     // Make an API call to submit the form with the token
  //     const response = await axios.post('http://13.235.115.160:5000/api/career', formDataToSend, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Attach token in the Authorization header
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     // Handle success response
  //     setSuccessMessage(response.data.message);
  //     setFormData({
  //       email: '',
  //       phone_number: '',
  //       profile: '',
  //       resume_filename: null,
  //     });
  //   } catch (error) {
  //     // Handle error response
  //     if (error.response && error.response.status === 401) {
  //       setErrors({ form: 'Unauthorized access. Please log in again.' });
  //       // Optionally, redirect the user to the login page
  //       // window.location.href = '/login';
  //     } else {
  //       setErrors({ form: 'An error occurred while submitting the form. Please try again.' });
  //     }
  //   }
  // };

  return (
    <>
      <Header />
      <section className="career-section">
        <form onSubmit={handleSubmit} className='career-form'>
          <h2>Career Application Form</h2>
          <div>
            <label>Email:</label>
            <input type="email" name="email" placeholder="Enter email ID" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" name="phone_number" placeholder="Enter phone number" value={formData.phone_number} onChange={handleChange} />
            {errors.phone_number && <p className="error-message">{errors.phone_number}</p>}
          </div>
          <div className="input-field">
            <label>Profile Applying For:</label>
            <select name="profile" value={formData.profile} onChange={handleChange}>
              <option value="">Select a profile</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Support Executive">Support Executive</option>
              <option value="Other">Other</option>
            </select>
            {errors.profile && <p className="error-message">{errors.profile}</p>}
          </div>
          <div className="input-field">
            <label>Upload Resume (PDF, DOC, DOCX):</label>
            <input type="file" name="resume_filename" accept=".pdf,.doc,.docx" onChange={handleChange} />
            {errors.resume_filename && <p className="error-message">{errors.resume_filename}</p>}
          </div>
          <button type="submit" className='career-btn'>Submit</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.form && <p className="error-message">{errors.form}</p>}
        </form>
      </section>
    </>
  );
};

export default Career;



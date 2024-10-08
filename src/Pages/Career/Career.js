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
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('phone_number', formData.phone_number);
    formDataToSubmit.append('profile', formData.profile);
    formDataToSubmit.append('resume', formData.resume_filename);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/career`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Attach the token here
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Application submitted successfully!');
        setFormData({ email: '', phone_number: '', profile: '', resume_filename: null });
        setErrors({});
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ form: 'An unexpected error occurred.' });
      }
    } catch (error) {
      console.error('Error response:', error);
      if (error.response && error.response.data) {
        setErrors({ apiError: error.response.data.message });
      } else {
        setErrors({ form: 'An unknown error occurred.' });
      }
    }
  };

  return (
    <>
      <Header />
      <section className="career-section">
        <form onSubmit={handleSubmit} className="career-form">
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
              <option value="Frontend">Frontend Developer</option>
              <option value="Backend">Backend Developer</option>
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
          <button type="submit" className="career-btn">Submit</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.form && <p className="error-message">{errors.form}</p>}
        </form>
      </section>
    </>
  );
};

export default Career;





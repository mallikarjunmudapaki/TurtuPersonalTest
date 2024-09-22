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

  const [token, setToken]=useState(null);
   useEffect(()=>{
    const savedToken=localStorage.getItem('token');
    if(savedToken){
      setToken(savedToken);
    }
   }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
    setErrors({ ...errors, [name]: '' }); // Clear error on input change
  };

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
  
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post('http://13.235.115.160:5000/api/career', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Add the token here
        },
      });
  
      if (response.status === 201) {
        setSuccessMessage('Application submitted successfully!');
        setFormData({ email: '', phone_number: '', profile: '', resume_filename: null });
  
        // Clear success message after a delay
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setErrors({ ...errors, form: 'Failed to submit the application. Please try again.' });
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!validateForm()) {
  //     return;
  //   }

  //   const formDataToSubmit = new FormData();
  //   formDataToSubmit.append('email', formData.email);
  //   formDataToSubmit.append('phone_number', formData.phone_number);
  //   formDataToSubmit.append('profile', formData.profile);
  //   formDataToSubmit.append('resume', formData.resume_filename);

  //   try {
  //     const response = await axios.post('http://13.235.115.160:5000/api/career', formDataToSubmit, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
          
  //       },
  //     });

  //     if (response.status === 201) {
  //       setSuccessMessage('Application submitted successfully!');
  //       setFormData({ email: '', phone_number: '', profile: '', resume_filename: null });

  //       // Clear success message after a delay
  //       setTimeout(() => {
  //         setSuccessMessage('');
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting the form:', error);
  //     setErrors({ ...errors, form: 'Failed to submit the application. Please try again.' });
  //   }
  // };

  return (
    <>
      <Header />
      <section className="career-section">
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Submit</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errors.form && <p className="error-message">{errors.form}</p>}
        </form>
      </section>
    </>
  );
};

export default Career;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './Career.css';
// import Header from '../../Components/Header/Header';

// const Career= () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     phone_number: '',
//     profile: '',
//     resume_filename: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//     setErrors({ ...errors, [name]: '' }); // Clear error on input change
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required.';
//     } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//       newErrors.email = 'Invalid email address.';
//     }

//     if (!formData.phone_number) {
//       newErrors.phone_number = 'Phone number is required.';
//     } else if (!/^\d{10}$/.test(formData.phone_number)) {
//       newErrors.phone_number = 'Phone number must be exactly 10 digits.';
//     }

//     if (!formData.profile) {
//       newErrors.profile = 'Please select a profile.';
//     }

//     if (!formData.resume_filename) {
//       newErrors.resume_filename = 'Please upload a PDF file.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append('email', formData.email);
//     formDataToSubmit.append('phone_number', formData.phone_number);
//     formDataToSubmit.append('profile', formData.profile);
//     formDataToSubmit.append('resume_filename', formData.resume_filename);


//     try {
//       const response = await axios.post('http://13.235.115.160:5000/api/career', formDataToSubmit, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setSuccessMessage('Application submitted successfully!');
//         setFormData({ email: '', phone_number: '', profile: '', resume_filename: null }); // Clear form
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <section className='career-section'>
//         <form onSubmit={handleSubmit}>
//           <h2>Career Application Form</h2>
//           <div>
//             <label>Email:</label>
//             <input type="email" name="email"  placeholder='Enter email ID' value={formData.email} onChange={handleChange} />
//             {errors.email && <p className="error-message">{errors.email}</p>}
//           </div>
//           <div>
//             <label>Phone Number:</label>
//             <input type="text" name="phone_number"  placeholder='Enter phone number' value={formData.phone_number} onChange={handleChange} />
//             {errors.phone_number && <p className="error-message">{errors.phone_number}</p>}
//           </div>
//           <div className='input-field'>
//             <label>Profile Applying For:</label>
//             <select name="profile" value={formData.profile} onChange={handleChange}>
//               <option value="">Select a profile</option>
//               <option value="Frontend">Frontend</option>
//               <option value="Backend">Backend</option>
//               <option value="Data Analyst">Data Analyst</option>
//               <option value="Support Executive">Support Executive</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.profile && <p className="error-message">{errors.profile}</p>}
//           </div>
//           <div className='input-field'>
//             <label>Upload Resume (PDF):</label>
//             <input type="file" name="resume_filename" accept=".pdf,.doc,.docs" onChange={handleChange} />
//             {errors.resume_filename && <p className="error-message">{errors.resume_filename}</p>}
//           </div>
//           <button type="submit">Submit</button>
//           {successMessage && <p className="success-message">{successMessage}</p>}
//         </form>
//       </section>
//     </>
//   );
// };

// export default Career;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './Career.css';
// import Header from '../../Components/Header/Header';

// const CareerForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     phone_number: '',
//     profile: '',
//     resume_filename: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');

//   // Check if the user is logged in by checking if the token exists in local storage
//   const isLoggedIn = () => {
//     return localStorage.getItem('token') !== null;
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//     setErrors({ ...errors, [name]: '' }); // Clear error on input change
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required.';
//     } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//       newErrors.email = 'Invalid email address.';
//     }

//     if (!formData.phone_number) {
//       newErrors.phone_number = 'Phone number is required.';
//     } else if (!/^\d{10}$/.test(formData.phone_number)) {
//       newErrors.phone_number = 'Phone number must be exactly 10 digits.';
//     }

//     if (!formData.profile) {
//       newErrors.profile = 'Please select a profile.';
//     }

//     if (!formData.resume_filename) {
//       newErrors.resume_filename = 'Please upload a PDF file.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if the user is logged in before submitting the form
//     if (!isLoggedIn()) {
//       alert('Please log in to submit the form.');
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append('email', formData.email);
//     formDataToSubmit.append('phone_number', formData.phone_number);
//     formDataToSubmit.append('profile', formData.profile);
//     formDataToSubmit.append('resume_filename', formData.file);

//     try {
//       // Get the token from local storage
//       const token = localStorage.getItem('token');

//       const response = await axios.post('http://localhost:5000/api/career', formDataToSubmit, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//         },
//       });

//       if (response.status === 200) {
//         setSuccessMessage('Application submitted successfully!');
//         setFormData({ email: '', phone_number: '', profile: '', resume_filename: null }); // Clear form
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <section className='career-section'>
//         <form onSubmit={handleSubmit}>
//           <h2>Career Application Form</h2>
//           <div>
//             <label>Email:</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} />
//             {errors.email && <p className="error-message">{errors.email}</p>}
//           </div>
//           <div>
//             <label>Phone Number:</label>
//             <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
//             {errors.phone_number && <p className="error-message">{errors.phone_number}</p>}
//           </div>
//           <div className='input-field'>
//             <label>Profile Applying For:</label>
//             <select name="profile" value={formData.profile} onChange={handleChange}>
//               <option value="">Select a profile</option>
//               <option value="Frontend">Frontend</option>
//               <option value="Backend">Backend</option>
//               <option value="Data Analyst">Data Analyst</option>
//               <option value="Support Executive">Support Executive</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.profile && <p className="error-message">{errors.profile}</p>}
//           </div>
//           <div className='input-field'>
//             <label>Upload Resume (PDF):</label>
//             <input type="file" name="resume_filename" accept=".pdf,.docs" onChange={handleChange} />
//             {errors.resume_filename && <p className="error-message">{errors.resume_filename}</p>}
//           </div>
//           <button type="submit">Submit</button>
//           {successMessage && <p className="success-message">{successMessage}</p>}
//         </form>
//       </section>
//     </>
//   );
// };

// export default CareerForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './Career.css';
// import Header from '../../Components/Header/Header';

// const CareerForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     phone_number: '',
//     profile: '',
//     file: null,
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//     setErrors({ ...errors, [name]: '' }); // Clear error on input change
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required.';
//     } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
//       newErrors.email = 'Invalid email address.';
//     }

//     if (!formData.phone_number) {
//       newErrors.phone_number = 'Phone number is required.';
//     } else if (!/^\d{10}$/.test(formData.phone_number)) {
//       newErrors.phone_number = 'Phone number must be exactly 10 digits.';
//     }

//     if (!formData.profile) {
//       newErrors.profile = 'Please select a profile.';
//     }

//     if (!formData.file) {
//       newErrors.file = 'Please upload a PDF file.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append('email', formData.email);
//     formDataToSubmit.append('phone_number', formData.phone_number);
//     formDataToSubmit.append('profile', formData.profile);
//     formDataToSubmit.append('file', formData.file);

//     try {
//       const response = await axios.post('http://localhost:5000/api/career', formDataToSubmit, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setSuccessMessage('Application submitted successfully!');
//         setFormData({ email: '', phone_number: '', profile: '', file: null }); // Clear form
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <>
//     <Header/>
//     <section className='career-section'>
//     <form onSubmit={handleSubmit}>
//       <h2>Career Application Form</h2>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         {errors.email && <p className="error-message">{errors.email}</p>}
//       </div>
//       <div>
//         <label>Phone Number:</label>
//         <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
//         {errors.phone_number && <p className="error-message">{errors.phone_number}</p>}
//       </div>
//       <div className='input-field'>
//         <label>Profile Applying For:</label>
//         <select name="profile" value={formData.profile} onChange={handleChange}>
//           <option value="">Select a profile</option>
//           <option value="Frontend">Frontend</option>
//           <option value="Backend">Backend</option>
//           <option value="Data Analyst">Data Analyst</option>
//           <option value="Support Executive">Support Executive</option>
//           <option value="Other">Other</option>
//         </select>
//         {errors.profile && <p className="error-message">{errors.profile}</p>}
//       </div>
//       <div className='input-field'>
//         <label>Upload Resume (PDF):</label>
//         <input type="file" name="file" accept=".pdf" onChange={handleChange} />
//         {errors.file && <p className="error-message">{errors.file}</p>}
//       </div>
//       <button type="submit">Submit</button>
//       {successMessage && <p className="success-message">{successMessage}</p>}
//     </form>
//     </section>
//     </>
//   );
// };

// export default CareerForm;

// import React, { useState } from 'react';
// import './Career.css';
// import axios from 'axios';
// import Header from '../../Components/Header/Header';
// function Career() {
//   const [formData, setFormData] = useState({
//     email: '',
//     phone: '',
//     profile: '',
//     resume: null,
//   });
//   const [errors, setErrors] = useState({});

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phone);
//   };

//   const validateResume = (resume) => {
//     const allowedExtensions = ['pdf', 'doc', 'docx'];
//     const fileExtension = resume?.name.split('.').pop().toLowerCase();
//     const fileSizeInMB = resume?.size / 1024 / 1024; 
//     return (
//       allowedExtensions.includes(fileExtension) &&
//       fileSizeInMB <= 1 
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//     setErrors({
//       ...errors,
//       [name]: '',
//     });
//   };
//   const handleKeyPress = (e) => {
//     const charCode = e.charCode;
//     if (charCode < 48 || charCode > 57) {
//       e.preventDefault();
//     }
//   };

//   const handleSubmit = (e) => {
    
//     let validationErrors = {};

//     if (!validateEmail(formData.email)) {
//       validationErrors.email = 'Invalid email address';
//     }

//     if (!validatePhone(formData.phone)) {
//       validationErrors.phone = 'Phone number must be 10 digits';
//     }

//     if (!formData.profile) {
//       validationErrors.profile = 'Profile field cannot be empty';
//     }

//     if (!formData.resume || !validateResume(formData.resume)) {
//       validationErrors.resume = 'Resume must be a PDF, DOC, or DOCX file and less than 1 MB';
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     console.log(formData);
//     e.preventDefault();
//     const email=e.target.email.value;
//     const phone=e.target.phone.value;
//     const profile=e.target.profile.value;
//     const resume=e.target.resume.value;
//     axios.post("",{
//       email,
//       phone,
//       profile,
//       resume,
//     })
//     .then(response=>{
//       console.log(response);
//     })
//     .catch((error)=>{
//       console.log(error);
//     });
//   };

//   return (
//     <>
//       <Header/>
//       <section className='career'>
//       <div className="careers-section">
//       <div className="career-header">
//         <header>
//           <h1>Career</h1>
//           <hr className="HLine mx-auto mb-5" />
//         </header>
//       </div>
//         <h6>Fill out the form below for job opportunities</h6>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email ID:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {errors.email && <p className="error-message">{errors.email}</p>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">Phone Number:</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               onKeyPress={handleKeyPress}
//               required
//             />
//             {errors.phone && <p className="error-message">{errors.phone}</p>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="profile">Profile Applying for:</label>
//             <input
//               type="text"
//               id="profile"
//               name="profile"
//               value={formData.profile}
//               onChange={handleChange}
//               required
//             />
//             {errors.profile && <p className="error-message">{errors.profile}</p>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="resume">Upload Resume/CV:</label>
//             <input
//               type="file"
//               id="resume"
//               name="resume"
//               accept=".pdf,.doc,.docx"
//               onChange={handleChange}
//               required
//             />
//             {errors.resume && <p className="error-message">{errors.resume}</p>}
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//       </section>
//     </>
//   );
// }

// export default Career;

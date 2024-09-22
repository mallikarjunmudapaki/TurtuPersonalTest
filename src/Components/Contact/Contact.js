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

// import { useState } from 'react';
// import axios from 'axios';
// import './Contact.css'; // Import your CSS file for styling

// export default function Contact() {
//   const [formValues, setFormValues] = useState({
//     username: '',
//     email: '',
//     phone_number: '',
//     queries: '',
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [message, setMessage] = useState(''); // To show messages

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     const errors = validate(formValues);
//     setFormErrors(errors);

//     // If no validation errors, submit the form
//     if (Object.keys(errors).length === 0) {
//       try {
//         // Prepare form data
//         const formData = new FormData();
//         formData.append('username', formValues.username);
//         formData.append('email', formValues.email);
//         formData.append('phone_number', formValues.phone_number);
//         formData.append('queries', formValues.queries);

//         // Send POST request with form data and token
//         const response = await axios.post(
//           'http://13.235.115.160:5000/api/contact',
//           formData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure you are sending the token
//             },
//           }
//         );
        

//         // Clear form on success
//         setFormValues({
//           username: '',
//           email: '',
//           phone_number: '',
//           queries: '',
//         });
//         setIsSuccess(true);
//         setMessage(''); // Clear any previous messages
//         setTimeout(() => setIsSuccess(false), 5000); // Hide success message after 5 seconds
//       } catch (error) {
//         console.error('Error submitting the form:', error);
//         setMessage('An error occurred during submission.');
//       }
//     }
//   };

//   const validate = (values) => {
//     const errors = {};
//     if (!values.username) {
//       errors.username = 'Username is required';
//     }
//     if (!values.email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//       errors.email = 'Email is not valid';
//     }
//     if (!values.phone_number) {
//       errors.phone_number = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(values.phone_number)) {
//       errors.phone_number = 'Phone number must be exactly 10 digits';
//     }
//     if (!values.queries) {
//       errors.queries = 'Query is required';
//     }
//     return errors;
//   };

//   return (
//     <form onSubmit={handleSubmit} className="contact-form">
//       <h2>Contact Us</h2>
//       {message && <p className="error-message">{message}</p>}
//       <div>
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter username"
//           value={formValues.username}
//           onChange={handleChange}
//         />
//         <p className="error-message">{formErrors.username}</p>
//       </div>
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter email ID"
//           value={formValues.email}
//           onChange={handleChange}
//         />
//         <p className="error-message">{formErrors.email}</p>
//       </div>
//       <div>
//         <label>Phone Number:</label>
//         <input
//           type="text"
//           name="phone_number"
//           placeholder="Enter phone number"
//           value={formValues.phone_number}
//           onChange={handleChange}
//         />
//         <p className="error-message">{formErrors.phone_number}</p>
//       </div>
//       <div>
//         <label>Query:</label>
//         <textarea
//           name="queries"
//           placeholder="Enter your query"
//           value={formValues.queries}
//           onChange={handleChange}
//         ></textarea>
//         <p className="error-message">{formErrors.queries}</p>
//       </div>
//       <button type="submit">Submit</button>
//       {isSuccess && <p className="success-message">Message sent successfully!</p>}
//     </form>
//   );
// }

// import { useState } from 'react';
// import axios from 'axios';
// import './Contact.css'; // Import your CSS file for styling

// export default function Contact() {
//   const [formValues, setFormValues] = useState({
//     username: '',
//     email: '',
//     phone_number: '',
//     queries: '',
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [message, setMessage] = useState(''); // To show messages

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     const errors = validate(formValues);
//     setFormErrors(errors);

//     // If no validation errors, submit the form
//     if (Object.keys(errors).length === 0) {
//       try {
//         await axios.post('http://13.235.115.160:5000/api/contact', formValues);
//         setFormValues({ username: '', email: '', phone_number: '', queries: '' });
//         setIsSuccess(true);
//         setMessage(''); // Clear any previous messages
//         setTimeout(() => setIsSuccess(false), 5000); // Hide success message after 5 seconds
//       } catch (error) {
//         console.error('Error submitting the form:', error);
//         setMessage('An error occurred during submission.');
//       }
//     }
//   };

//   const validate = (values) => {
//     const errors = {};
//     if (!values.username) {
//       errors.username = 'Username is required';
//     }
//     if (!values.email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//       errors.email = 'Email is not valid';
//     }
//     if (!values.phone_number) {
//       errors.phone_number = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(values.phone_number)) {
//       errors.phone_number = 'Phone number must be exactly 10 digits';
//     }
//     if (!values.queries) {
//       errors.queries = 'Query is required';
//     }
//     return errors;
//   };

//   return (
//     <form onSubmit={handleSubmit} className="contact-form">
//       <h2>Contact Us</h2>
//       {message && <p className="error-message">{message}</p>}
//       <div>
//         <label>Username:</label>
//         <input type="text" name="username" placeholder='Enter username' value={formValues.username} onChange={handleChange} />
//         <p className="error-message">{formErrors.username}</p>
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email"  placeholder='Enter email ID' value={formValues.email} onChange={handleChange} />
//         <p className="error-message">{formErrors.email}</p>
//       </div>
//       <div>
//         <label>Phone Number:</label>
//         <input type="text" name="phone_number"  placeholder='Enter phone number' value={formValues.phone_number} onChange={handleChange} />
//         <p className="error-message">{formErrors.phone_number}</p>
//       </div>
//       <div>
//         <label>Query:</label>
//         <textarea name="queries"  placeholder='Enter your query' value={formValues.queries} onChange={handleChange}></textarea>
//         <p className="error-message">{formErrors.queries}</p>
//       </div>
//       <button type="submit">Submit</button>
//       {isSuccess && <p className="success-message">Message sent successfully!</p>}
//     </form>
//   );
// }

// import { useState } from 'react';
// import axios from 'axios';
// import './Contact.css'; // Import your CSS file for styling

// export default function Contact() {
//   const [formValues, setFormValues] = useState({
//     username: '',
//     email: '',
//     phone_number: '',
//     query: '',
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [message, setMessage] = useState(''); // To show login messages

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if user is logged in
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       setMessage('Please log in to submit the form.');
//       return;
//     }

//     // Verify token with the backend
//     try {
//       const verifyResponse = await axios.post('http://localhost:5000/api/verify-token', { token });
//       if (verifyResponse.data.status !== 'success') {
//         setMessage('Please log in to submit the form.');
//         return;
//       }
//     } catch (error) {
//       console.error('Error verifying token:', error);
//       setMessage('Error verifying session. Please log in again.');
//       return;
//     }

//     // Validate form inputs
//     const errors = validate(formValues);
//     setFormErrors(errors);

//     // If no validation errors, submit the form
//     if (Object.keys(errors).length === 0) {
//       try {
//         await axios.post('http://localhost:5000/api/contact', formValues, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token for verification
//           },
//         });
//         setFormValues({ username: '', email: '', phone_number: '', query: '' });
//         setIsSuccess(true);
//         setMessage(''); // Clear any login-related messages
//         setTimeout(() => setIsSuccess(false), 5000); // Hide success message after 5 seconds
//       } catch (error) {
//         console.error('Error submitting the form:', error);
//         setMessage('An error occurred during submission.');
//       }
//     }
//   };

//   const validate = (values) => {
//     const errors = {};
//     if (!values.username) {
//       errors.username = 'Username is required';
//     }
//     if (!values.email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(values.email)) {
//       errors.email = 'Email is not valid';
//     }
//     if (!values.phone_number) {
//       errors.phone_number = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(values.phone_number)) {
//       errors.phone_number = 'Phone number must be exactly 10 digits';
//     }
//     if (!values.query) {
//       errors.query = 'Query is required';
//     }
//     return errors;
//   };

//   return (
//     <form onSubmit={handleSubmit} className="contact-form">
//       <h2>Contact Us</h2>
//       {message && <p className="error-message">{message}</p>}
//       <div>
//         <label>Username:</label>
//         <input type="text" name="username" value={formValues.username} onChange={handleChange} />
//         <p className="error-message">{formErrors.username}</p>
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" name="email" value={formValues.email} onChange={handleChange} />
//         <p className="error-message">{formErrors.email}</p>
//       </div>
//       <div>
//         <label>Phone Number:</label>
//         <input type="text" name="phone_number" value={formValues.phone_number} onChange={handleChange} />
//         <p className="error-message">{formErrors.phone_number}</p>
//       </div>
//       <div>
//         <label>Query:</label>
//         <textarea name="query" value={formValues.query} onChange={handleChange}></textarea>
//         <p className="error-message">{formErrors.query}</p>
//       </div>
//       <button type="submit">Submit</button>
//       {isSuccess && <p className="success-message">Message sent successfully!</p>}
//     </form>
//   );
// }

// import { useState, useEffect } from 'react';
// import Aos from 'aos';
// import 'aos/dist/aos.css';
// import './Contact.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Correct way to import


// import contactImage from '../../Images/Contact1.png';

// export default function Contact() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track if the user is logged in
//   const navigate = useNavigate(); // For redirection

//   useEffect(() => {
//     Aos.init({ duration: 1000 });

//     // Check if the user is authenticated
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       try {
//         jwtDecode(token); // Attempt to decode the token
//         setIsAuthenticated(true); // If valid token, user is authenticated
//       } catch (error) {
//         console.error('Invalid token', error);
//         setIsAuthenticated(false);
//         navigate('/login'); // Redirect to login if the token is invalid
//       }
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [navigate]);

//   const initialValues = { username: '', email: '', phone_number: '', queries: '' };
//   const [formValues, setFormValues] = useState(initialValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [authErrorMessage, setAuthErrorMessage] = useState(''); // State for authentication error message

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform validation
//     const errors = validate(formValues);
//     setFormErrors(errors);
//     setIsSubmit(true);

//     if (!isAuthenticated) {
//       setAuthErrorMessage('Please login or sign up to submit the form.'); // Set error message if user is not authenticated
//       return;
//     }

//     if (Object.keys(errors).length === 0) {
//       try {
//         const formData = new FormData();
//         formData.append('username', formValues.username);
//         formData.append('email', formValues.email);
//         formData.append('phone_number', formValues.phone_number);
//         formData.append('queries', formValues.queries);

//         const token = localStorage.getItem('authToken');
//         const headers = {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`, // Pass token in headers
//         };

//         // Submit the form
//         await axios.post('http://13.235.115.160:5000/api/contact', formData, { headers });

//         setFormValues(initialValues); // Clear form fields
//         setIsSuccess(true); // Set success state to true
//         setTimeout(() => setIsSuccess(false), 5000); // Hide success message after 5 seconds
//       } catch (error) {
//         console.error('There was an error submitting the form!', error);
//         alert('An error occurred. Please try again.');
//       }
//     }
//   };

//   useEffect(() => {
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(formValues);
//     }
//   }, [formErrors, formValues, isSubmit]);

//   const validate = (values) => {
//     const errors = {};
//     if (!values.username.trim()) {
//       errors.username = 'Username is required';
//     } else if (values.username.length < 2) {
//       errors.username = 'Username must be more than 2 characters';
//     } else if (!/^[A-Za-z\s]+$/.test(values.username)) {
//       errors.username = 'Username must only contain letters';
//     }
//     if (!values.email) {
//       errors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
//       errors.email = 'Email is not valid';
//     }
//     if (!values.phone_number) {
//       errors.phone_number = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(values.phone_number)) {
//       errors.phone_number = 'Phone number must be exactly 10 digits';
//     }
//     if (!values.queries.trim()) {
//       errors.queries = 'Query message is required';
//     }
//     return errors;
//   };

//   const handleKeyPress = (e) => {
//     const charCode = e.charCode;
//     if (charCode < 48 || charCode > 57) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <section className="contact" id="contact">
//       <div className="heading text-center">
//         <h3>Contact Us</h3>
//         <p>Leave us a message</p>
//       </div>
//       <div className="container">
//         <div className="contact-image">
//           <img src={contactImage} alt="contact" />
//         </div>
//         <div className="contact-form">
//           <div className="form py-4">
//             <form onSubmit={handleSubmit}>
//               <div className="input-control">
//                 <label htmlFor="username">User Name</label>
//                 <input
//                   type="text"
//                   name="username"
//                   id="username"
//                   placeholder="Username"
//                   value={formValues.username}
//                   onChange={handleChange}
//                 />
//                 <p className="error-message">{formErrors.username}</p>
//               </div>
//               <div className="input-control">
//                 <label htmlFor="email">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="Email Address"
//                   value={formValues.email}
//                   onChange={handleChange}
//                 />
//                 <p className="error-message">{formErrors.email}</p>
//               </div>
//               <div className="input-control">
//                 <label htmlFor="phone_number">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone_number"
//                   id="phone_number"
//                   placeholder="Phone Number"
//                   value={formValues.phone_number}
//                   onChange={handleChange}
//                   onKeyPress={handleKeyPress}
//                 />
//                 <p className="error-message">{formErrors.phone_number}</p>
//               </div>
//               <div className="input-control">
//                 <label htmlFor="queries">Query</label>
//                 <textarea
//                   id="queries"
//                   name="queries"
//                   placeholder="Write something.."
//                   value={formValues.queries}
//                   onChange={handleChange}
//                 ></textarea>
//                 <p className="error-message">{formErrors.queries}</p>
//               </div>
//               <div className="input-control">
//                 <button type="submit">Submit</button>
//               </div>
//               {authErrorMessage && (
//                 <p className="error-message">{authErrorMessage}</p>
//               )}
//               {isSuccess && (
//                 <div className="message-success">Message sent successfully!</div>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

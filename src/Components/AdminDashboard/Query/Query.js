import { useState, useEffect } from 'react';
import axios from 'axios';
import './Query.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('contact');
  const [contactData, setContactData] = useState([]);
  const [careerData, setCareerData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Single filter state for both name and profile in career applications
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Contact Queries
  const fetchContactQueries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/contact-queries`);
      const sortedContacts = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setContactData(sortedContacts);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch contact queries.');
      setLoading(false);
    }
  };

  // Fetch Career Applications
  const fetchCareerApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/career-applications`);
      const sortedApplications = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setCareerData(sortedApplications);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch career applications.');
      setLoading(false);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'contact') {
      fetchContactQueries();
    } else if (activeTab === 'career') {
      fetchCareerApplications();
    }
  }, [activeTab]);

  // Filtered contact queries
  const filteredContacts = contactData.filter(contact =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtered career applications based on combined search for name/profile
  const filteredCareers = careerData.filter(app =>
    app.profile.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())  // Can also include name if available in data
  );

  return (
    <div className="admin-dashboard-container">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Queries
        </button>
        <button
          className={`tab-button ${activeTab === 'career' ? 'active' : ''}`}
          onClick={() => setActiveTab('career')}
        >
          Career Applications
        </button>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p className="error-message-container">{error}</p>}

      {/* Search Filter */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name or profile"
          className="filter-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Contact Queries Table */}
      {activeTab === 'contact' && (
        <div className="table-wrapper">
          <h3>Contact Queries</h3>
          <table className="custom-table">
            <thead>
              <tr>
                <th className="table-header-cell">Date</th>
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Email</th>
                <th className="table-header-cell">Phone Number</th>
                <th className="table-header-cell">Queries</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="table-row">
                  <td className="table-cell">{new Date(contact.created_at).toLocaleString()}</td>
                  <td className="table-cell">{contact.username}</td>
                  <td className="table-cell">{contact.email}</td>
                  <td className="table-cell">{contact.phone_number}</td>
                  <td className="table-cell">{contact.queries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Career Applications Table */}
      {activeTab === 'career' && (
        <div className="table-wrapper">
          <h3>Career Applications</h3>
          <table className="custom-table">
            <thead>
              <tr>
                <th className="table-header-cell">Date</th>
                <th className="table-header-cell">Email</th>
                <th className="table-header-cell">Phone Number</th>
                <th className="table-header-cell">Profile</th>
                <th className="table-header-cell">Resume</th>
              </tr>
            </thead>
            <tbody>
            {filteredCareers.map((app) => (
  <tr key={app.id} className="table-row">
    <td className="table-cell">{new Date(app.created_at).toLocaleString()}</td>
    <td className="table-cell">{app.email}</td>
    <td className="table-cell">{app.phone_number}</td>
    <td className="table-cell">{app.profile}</td>
    <td className="table-cell">
      <a
        href={app.resume_filename}  // Use the complete URL directly
        target="_blank"
        rel="noopener noreferrer"
        className="resume-link"
      >
        View Resume
      </a>
    </td>
  </tr>
))}


              {/* {filteredCareers.map((app) => (
                <tr key={app.id} className="table-row">
                  <td className="table-cell">{new Date(app.created_at).toLocaleString()}</td>
                  <td className="table-cell">{app.email}</td>
                  <td className="table-cell">{app.phone_number}</td>
                  <td className="table-cell">{app.profile}</td>
                  <td className="table-cell">
                    <a href={`/path/to/resumes/${app.resume_filename}`} target="_blank" rel="noopener noreferrer">
                      {app.resume_filename}
                    </a>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Query.css';

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('contact'); // Default active tab
//   const [contactData, setContactData] = useState([]);
//   const [careerData, setCareerData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   // Filter states
//   const [searchName, setSearchName] = useState(''); // Now filtering by name instead of email
//   const [careerProfileFilter, setCareerProfileFilter] = useState(''); // For career

//   // Fetch Contact Queries from backend
//   const fetchContactQueries = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/contact-queries`);
//       // Sort data by created_at descending
//       const sortedContacts = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setContactData(sortedContacts);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch contact queries.');
//       setLoading(false);
//     }
//   };

//   // Fetch Career Applications from backend
//   const fetchCareerApplications = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/career-applications`);
//       // Sort data by created_at descending
//       const sortedApplications = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setCareerData(sortedApplications);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch career applications.');
//       setLoading(false);
//     }
//   };

//   // Load the respective data when a tab is clicked
//   useEffect(() => {
//     if (activeTab === 'contact') {
//       fetchContactQueries();
//     } else if (activeTab === 'career') {
//       fetchCareerApplications();
//     }
//   }, [activeTab]);

//   // Filtered contact queries based on searchName
//   const filteredContacts = contactData.filter(contact =>
//     contact.username.toLowerCase().includes(searchName.toLowerCase()) // Filter by username
//   );

//   // Filtered career applications based on careerProfileFilter and searchName (if you have a name for career, otherwise we keep profile filter)
//   const filteredCareers = careerData.filter(app =>
//     app.profile.toLowerCase().includes(careerProfileFilter.toLowerCase())
//   );

//   return (
//     <div className="admin-dashboard-container">
//       <div className="tabs-container">
//         <button
//           className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
//           onClick={() => setActiveTab('contact')}
//         >
//           Contact Queries
//         </button>
//         <button
//           className={`tab-button ${activeTab === 'career' ? 'active' : ''}`}
//           onClick={() => setActiveTab('career')}
//         >
//           Career Applications
//         </button>
//       </div>

//       {loading && <p>Loading data...</p>}
//       {error && <p className="error-message-container">{error}</p>}

//       {/* Search Filters */}
//       <div className="filter-container">
//         <input
//           type="text"
//           placeholder="Search by name"
//           className="filter-input"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//         />
//         {activeTab === 'career' && (
//           <input
//             type="text"
//             placeholder="Filter by profile"
//             className="filter-input"
//             value={careerProfileFilter}
//             onChange={(e) => setCareerProfileFilter(e.target.value)}
//           />
//         )}
//       </div>

//       {/* Contact Queries Table */}
//       {activeTab === 'contact' && (
//         <div className="table-wrapper">
//           <h3>Contact Queries</h3>
//           <table className="custom-table">
//             <thead>
//               <tr>
//                 {/* <th className="table-header-cell">ID</th> */}
//                 <th className="table-header-cell">Date</th>
//                 <th className="table-header-cell">Name</th>
//                 <th className="table-header-cell">Email</th>
//                 <th className="table-header-cell">Phone Number</th>
//                 <th className="table-header-cell">Queries</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {filteredContacts.map((contact) => (
//                 <tr key={contact.id} className="table-row">
//                   {/* <td className="table-cell">{contact.id}</td> */}
//                   <td className="table-cell">{new Date(contact.created_at).toLocaleString()}</td>
//                   <td className="table-cell">{contact.username}</td>
//                   <td className="table-cell">{contact.email}</td>
//                   <td className="table-cell">{contact.phone_number}</td>
//                   <td className="table-cell">{contact.queries}</td>
                 
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Career Applications Table */}
//       {activeTab === 'career' && (
//         <div className="table-wrapper">
//           <h3>Career Applications</h3>
//           <table className="custom-table">
//             <thead>
//               <tr>
//                 {/* <th className="table-header-cell">ID</th> */}
//                 <th className="table-header-cell">Date</th>
//                 <th className="table-header-cell">Email</th>
//                 <th className="table-header-cell">Phone Number</th>
//                 <th className="table-header-cell">Profile</th>
//                 <th className="table-header-cell">Resume</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCareers.map((app) => (
//                 <tr key={app.id} className="table-row">
//                   {/* <td className="table-cell">{app.id}</td> */}
//                   <td className="table-cell">{new Date(app.created_at).toLocaleString()}</td>
//                   <td className="table-cell">{app.email}</td>
//                   <td className="table-cell">{app.phone_number}</td>
//                   <td className="table-cell">{app.profile}</td>
//                   <td className="table-cell">
//                     <a href={`/path/to/resumes/${app.resume_filename}`} target="_blank" rel="noopener noreferrer">
//                       {app.resume_filename}
//                     </a>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Query.css'; // Import your CSS file

// export default function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('contact'); // Default active tab is 'contact'
//   const [contactData, setContactData] = useState([]);
//   const [careerData, setCareerData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch Contact Queries from backend
//   const fetchContactQueries = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/contact-queries`);
//       setContactData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch contact queries.');
//       setLoading(false);
//     }
//   };

//   // Fetch Career Applications from backend
//   const fetchCareerApplications = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/career-applications`);
//       setCareerData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch career applications.');
//       setLoading(false);
//     }
//   };

//   // Load the respective data when a tab is clicked
//   useEffect(() => {
//     if (activeTab === 'contact') {
//       fetchContactQueries();
//     } else if (activeTab === 'career') {
//       fetchCareerApplications();
//     }
//   }, [activeTab]);

//   return (
//     <div className="admin-dashboard-container">
//       <div className="tabs-container">
//         <button
//           className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
//           onClick={() => setActiveTab('contact')}
//         >
//           Contact Queries
//         </button>
//         <button
//           className={`tab-button ${activeTab === 'career' ? 'active' : ''}`}
//           onClick={() => setActiveTab('career')}
//         >
//           Career Applications
//         </button>
//       </div>

//       {loading && <p>Loading data...</p>}
//       {error && <p className="error-message-container">{error}</p>}

//       {activeTab === 'contact' && (
//         <div className="table-wrapper">
//           <h3>Contact Queries</h3>
//           <table className="custom-table">
//             <thead>
//               <tr>
//                 <th className="table-header-cell">ID</th>
//                 <th className="table-header-cell">Name</th>
//                 <th className="table-header-cell">Email</th>
//                 <th className="table-header-cell">Phone Number</th>
//                 <th className="table-header-cell">Queries</th>
//                 <th className="table-header-cell">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contactData.map((contact) => (
//                 <tr key={contact.id} className="table-row">
//                   <td className="table-cell">{contact.id}</td>
//                   <td className="table-cell">{contact.username}</td>
//                   <td className="table-cell">{contact.email}</td>
//                   <td className="table-cell">{contact.phone_number}</td>
//                   <td className="table-cell">{contact.queries}</td>
//                   <td className="table-cell">{new Date(contact.created_at).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {activeTab === 'career' && (
//         <div className="table-wrapper">
//           <h3>Career Applications</h3>
//           <table className="custom-table">
//             <thead>
//               <tr>
//                 <th className="table-header-cell">ID</th>
//                 <th className="table-header-cell">Email</th>
//                 <th className="table-header-cell">Phone Number</th>
//                 <th className="table-header-cell">Profile</th>
//                 <th className="table-header-cell">Resume</th>
//                 <th className="table-header-cell">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {careerData.map((app) => (
//                 <tr key={app.id} className="table-row">
//                   <td className="table-cell">{app.id}</td>
//                   <td className="table-cell">{app.email}</td>
//                   <td className="table-cell">{app.phone_number}</td>
//                   <td className="table-cell">{app.profile}</td>
//                   <td className="table-cell">{app.resume_filename}</td>
//                   <td className="table-cell">{new Date(app.created_at).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

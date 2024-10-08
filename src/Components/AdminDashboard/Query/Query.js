import { useState, useEffect } from 'react';
import axios from 'axios';
import './Query.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('contact');
  const [contactData, setContactData] = useState([]);
  const [careerData, setCareerData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) 
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
          placeholder={activeTab === 'contact' ? 'Search by name' : 'Search by name or profile'}
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
                <th className="c-table-header-cell">Date</th>
                <th className="c-table-header-cell">Name</th>
                <th className="c-table-header-cell">Email</th>
                <th className="c-table-header-cell">Phone Number</th>
                <th className="c-table-header-cell query">Queries</th>
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
                      href={`${process.env.REACT_APP_API_BASE_URL}/api/career-applications/${app.id}/resume`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-link"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
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
//   const [activeTab, setActiveTab] = useState('contact');
//   const [contactData, setContactData] = useState([]);
//   const [careerData, setCareerData] = useState([]); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   // Single filter state for both name and profile in career applications
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch Contact Queries
//   const fetchContactQueries = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/contact-queries`);
//       const sortedContacts = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setContactData(sortedContacts);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch contact queries.');
//       setLoading(false);
//     }
//   };

//   // Fetch Career Applications
//   const fetchCareerApplications = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/career-applications`);
//       const sortedApplications = response.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setCareerData(sortedApplications);
//       setLoading(false);
//     } catch (error) {
//       setError('Failed to fetch career applications.');
//       setLoading(false);
//     }
//   };

//   // Load data based on active tab
//   useEffect(() => {
//     if (activeTab === 'contact') {
//       fetchContactQueries();
//     } else if (activeTab === 'career') {
//       fetchCareerApplications();
//     }
//   }, [activeTab]);

//   // Filtered contact queries
//   const filteredContacts = contactData.filter(contact =>
//     contact.username.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Filtered career applications based on combined search for name/profile
//   const filteredCareers = careerData.filter(app =>
//     app.profile.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     app.email.toLowerCase().includes(searchTerm.toLowerCase())  // Can also include name if available in data
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

//       {/* Search Filter */}
//       <div className="filter-container">
//         <input
//           type="text"
//           placeholder="Search by name or profile"
//           className="filter-input"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Contact Queries Table */}
//       {activeTab === 'contact' && (
//         <div className="table-wrapper">
//           <h3>Contact Queries</h3>
//           <table className="custom-table">
//             <thead>
//               <tr>
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
//                 <th className="table-header-cell">Date</th>
//                 <th className="table-header-cell">Email</th>
//                 <th className="table-header-cell">Phone Number</th>
//                 <th className="table-header-cell">Profile</th>
//                 <th className="table-header-cell">Resume</th>
//               </tr>
//             </thead>
//             <tbody>
//             {filteredCareers.map((app) => (
//   <tr key={app.id} className="table-row">
//     <td className="table-cell">{new Date(app.created_at).toLocaleString()}</td>
//     <td className="table-cell">{app.email}</td>
//     <td className="table-cell">{app.phone_number}</td>
//     <td className="table-cell">{app.profile}</td>
//     <td className="table-cell">
//     <a
//                 href={`${process.env.REACT_APP_API_BASE_URL}/api/career-applications/${app.id}/resume`}  // Updated URL for download
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="resume-link"
//               >
//                 View Resume
//               </a>
     
//     </td>
//   </tr>
// ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

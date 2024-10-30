import { useState, useEffect } from 'react';
import axios from 'axios';
import './Query.css';

export default function UserQuery() {
  const [activeTab, setActiveTab] = useState('contact');
  const [contactData, setContactData] = useState([]);
  const [careerData, setCareerData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const fetchContactQueries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/web/contact-queries`);
      const sortedContacts = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setContactData(sortedContacts);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch contact queries.');
      setLoading(false);
    }
  };

  const fetchCareerApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/web/career-applications`);
      const sortedApplications = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCareerData(sortedApplications);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch career applications.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'contact') {
      fetchContactQueries();
    } else if (activeTab === 'career') {
      fetchCareerApplications();
    }
  }, [activeTab]);

  const filteredContacts = contactData.filter(contact =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCareers = careerData.filter(app =>
    app.profile.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  );


  const viewResume = (applicationId) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/web/career-applications/${applicationId}/resume`;
    window.open(url, '_blank'); 
  };

  
  const downloadResume = async (applicationId) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/career-applications/${applicationId}/resume?download=true`;
    try {
      const response = await axios({
        url: url,
        method: 'GET',
        responseType: 'blob', 
      });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      link.setAttribute('download', `resume_${applicationId}.pdf`); 
      document.body.appendChild(link);
      link.click(); 
      link.remove(); 
    } catch (error) {
      console.error('Error downloading the resume:', error);
    }
  };

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
                  <td className="table-cell">{new Date(contact.createdAt).toLocaleString()}</td>
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
                  <td className="table-cell">{new Date(app.createdAt).toLocaleString()}</td>
                  <td className="table-cell">{app.email}</td>
                  <td className="table-cell">{app.phone_number}</td>
                  <td className="table-cell">{app.profile}</td>
                  <td className="table-cell">
                    <button onClick={() => viewResume(app.id)} className="resume-button">
                      View Resume
                    </button>
                    <button onClick={() => downloadResume(app.id)} className="resume-button download-button">
                      Download Resume
                    </button>
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

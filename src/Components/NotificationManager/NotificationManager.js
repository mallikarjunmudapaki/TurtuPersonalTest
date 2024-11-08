// // src/Components/NotificationManager/NotificationManager.js
// import React, { useEffect } from 'react';

// const NotificationManager = () => {
//     useEffect(() => {
//         const requestNotificationPermission = async () => {
//             if (Notification.permission !== 'granted') {
//                 const permission = await Notification.requestPermission();
//                 if (permission === 'granted') {
//                     console.log('Notification permission granted.');
//                 } else {
//                     console.log('Notification permission denied.');
//                 }
//             }
//         };

//         const ws = new WebSocket('ws://localhost:8080');

//         ws.onopen = () => {
//             console.log('Connected to WebSocket server');
//         };

//         ws.onclose = () => {
//             console.log('Disconnected from WebSocket server');
//         };

//         ws.onmessage = (event) => {
//             const notificationData = JSON.parse(event.data);
//             showNotificationWithSound(notificationData.title, {
//                 body: notificationData.message,
//                 icon: notificationData.icon,
//             });
//         };

//         requestNotificationPermission();

//         return () => {
//             ws.close();
//         };
//     }, []);

//     const showNotificationWithSound = (title, options) => {
//         if (Notification.permission === 'granted') {
//             const notification = new Notification(title, options);
//             const audio = new Audio('/path/to/your-sound.mp3');
//             audio.play().catch(error => console.log('Error playing sound:', error));
//         }
//     };

//     return null;
// };

// export default NotificationManager;




// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';

// const NotificationManager = () => {
//   const [isPermissionGranted, setIsPermissionGranted] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const checkNotificationPermission = async () => {
//       if (Notification.permission !== 'granted') {
//         setIsModalOpen(true);
//       } else {
//         setIsPermissionGranted(true);
//       }
//     };

//     checkNotificationPermission();
//   }, []);

//   const requestNotificationPermission = async () => {
//     const permission = await Notification.requestPermission();
//     if (permission === 'granted') {
//       setIsPermissionGranted(true);
//       setIsModalOpen(false);
//       console.log('Notification permission granted.');
//     } else {
//       console.log('Notification permission denied.');
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       {/* Modal for Notification Permission */}
//       <Modal 
//         isOpen={isModalOpen} 
//         onRequestClose={closeModal}
//         contentLabel="Enable Notifications"
//         ariaHideApp={false}
//         style={{
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center'
//           },
//           content: {
//             position: 'relative',
//             inset: 'auto',
//             backgroundColor: '#fff', // White background for the modal
//             borderRadius: '8px', // Rounded corners
//             padding: '20px', // Space inside the modal
//             width: '80%', // Width of the modal
//             maxWidth: '300px', // Max width of the modal
//             margin: 'auto', // Center the modal on the screen
//             textAlign: 'center', // Center the text
//             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Light shadow for depth
//             animation: 'fadeIn 0.3s ease-out', // Modal fade-in animation
//           }
//         }}
//       >
//         <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Enable Notifications</h2>
//         <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>To receive updates, please enable notifications.</p>
//         <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//           <button 
//             onClick={requestNotificationPermission}
//             style={{
//               backgroundColor: '#4CAF50', // Green button
//               color: 'white',
//               border: 'none',
//               padding: '10px 15px',
//               borderRadius: '5px',
//               fontSize: '14px',
//               cursor: 'pointer',
//               transition: 'background-color 0.3s ease',
//             }}
//             onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} // Hover effect
//             onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
//           >
//             Allow
//           </button>
//           <button 
//             onClick={closeModal}
//             style={{
//               backgroundColor: '#f44336', // Red button
//               color: 'white',
//               border: 'none',
//               padding: '10px 15px',
//               borderRadius: '5px',
//               fontSize: '14px',
//               cursor: 'pointer',
//               transition: 'background-color 0.3s ease',
//             }}
//             onMouseEnter={(e) => e.target.style.backgroundColor = '#e53935'} // Hover effect
//             onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
//           >
//             Close
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default NotificationManager;



import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const NotificationManager = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(Notification.permission === 'granted');
  const [isPermissionDenied, setIsPermissionDenied] = useState(Notification.permission === 'denied');
  const [isModalOpen, setIsModalOpen] = useState(Notification.permission !== 'granted');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    ws.onmessage = (event) => {
      const notificationData = JSON.parse(event.data);
      showNotificationWithSound(notificationData.title, {
        body: notificationData.message,
        icon: notificationData.icon,
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setIsPermissionGranted(true);
      setIsModalOpen(false);
      console.log('Notification permission granted.');
    } else if (permission === 'denied') {
      setIsPermissionDenied(true);
      console.log('Notification permission denied.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNotificationWithSound = (title, options) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, options);
      const audio = new Audio('https://notificationsounds.com/notification-sounds/eventually-590/download/mp3');
      audio.play().catch(error => console.log('Error playing sound:', error));
    }
  };

  return (
    <div>
      {/* Modal for Notification Permission */}
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal}
        contentLabel="Enable Notifications"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          content: {
            position: 'relative',
            inset: 'auto',
            backgroundColor: '#fff', // White background for the modal
            borderRadius: '8px', // Rounded corners
            padding: '20px', // Space inside the modal
            width: '80%', // Width of the modal
            maxWidth: '300px', // Max width of the modal
            margin: 'auto', // Center the modal on the screen
            textAlign: 'center', // Center the text
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Light shadow for depth
            animation: 'fadeIn 0.3s ease-out', // Modal fade-in animation
          }
        }}
      >
        <h2 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>Enable Notifications</h2>
        {isPermissionDenied ? (
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
            Notifications are blocked. Please enable them in your browser settings.
          </p>
        ) : (
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
            To receive updates, please enable notifications.
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {!isPermissionDenied && (
            <button 
              onClick={requestNotificationPermission}
              style={{
                backgroundColor: '#4CAF50', // Green button
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} // Hover effect
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              Allow
            </button>
          )}
          <button 
            onClick={closeModal}
            style={{
              backgroundColor: '#f44336', // Red button
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#e53935'} // Hover effect
            onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default NotificationManager;

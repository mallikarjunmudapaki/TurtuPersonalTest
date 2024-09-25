// utils.js (or wherever you keep utility functions)
export const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found in local storage.');
        return null; // Return null if the token is not found
    }
    return token;
};
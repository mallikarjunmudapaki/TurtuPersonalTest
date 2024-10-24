
export const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found in local storage.');
        return null; 
    }
    return token;
};
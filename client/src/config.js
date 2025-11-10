// Centralized API base URL for the frontend
// Falls back to localhost:5000 for Docker Compose or local dev
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL?.trim() || 'http://localhost:5001/api';

export default API_BASE_URL;



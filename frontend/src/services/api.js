// Example API service for backend communication
const API_BASE = 'http://localhost:5000/api';

export async function getHealth() {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) throw new Error('API health check failed');
  return response.json();
} 
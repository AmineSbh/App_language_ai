const API_URL = 'http://localhost:8000';

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(${API_URL});
    return response.json();
  },
  // Ajoutez d'autres méthodes HTTP selon vos besoins
};

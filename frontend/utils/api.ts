 export const API_BASE_URL = 'http://localhost:5000/api/v1';

// export const fetchAccounts = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/accounts/all`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         token: 'Bearer your-token' // This will be handled by backend
//       })
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch accounts');
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching accounts:', error);
//     throw error;
//   }
// };
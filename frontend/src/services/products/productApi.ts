import { API_BASE_URL } from '../../../utils/api';

const getAuthToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/get-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get auth token');
    }
    
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/products/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductsByMarketplace = async (marketplaceType: 'Financial' | 'Non-Financial') => {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/products/marketplace`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        marketplaceType: marketplaceType
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products by marketplace');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products by marketplace:', error);
    throw error;
  }
};

export const fetchProductsByPartner = async (partner: string) => {
  try {
    const data = await fetchProducts();
    const products = data.data || [];
    
    const filteredProducts = products.filter((p: any) => p.kf_partner === partner);
    
    return {
      ...data,
      data: filteredProducts,
      totalCount: filteredProducts.length
    };
  } catch (error) {
    console.error('Error fetching products by partner:', error);
    throw error;
  }
};
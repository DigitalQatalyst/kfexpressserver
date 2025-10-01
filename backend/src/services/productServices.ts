import axios from 'axios';

interface ProductResponse {
  value: any[];
  '@odata.count'?: number;
}

export const fetchAllProducts = async (token: string): Promise<ProductResponse> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };

  const response = await axios.get(
    `${process.env.WEB_API_URL}/products?$count=true`,
    { headers }
  );

  return response.data;
};

export const fetchProductById = async (token: string, productId: string): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };

  const response = await axios.get(
    `${process.env.WEB_API_URL}/products(${productId})`,
    { headers }
  );

  return response.data;
};

// export const fetchAccountById = async (token: string, accountId: string): Promise<any> => {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     Accept: 'application/json',
//     'OData-Version': '4.0',
//     'OData-MaxVersion': '4.0'
//   };

//   const response = await axios.get(
//     `${process.env.WEB_API_URL}/accounts(${accountId})`,
//     { headers }
//   );

//   return response.data;
// };
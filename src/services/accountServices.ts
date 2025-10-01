import axios from 'axios';

interface AccountsResponse {
  value: any[];
  '@odata.count'?: number;
}

export const fetchAllAccounts = async (token: string): Promise<AccountsResponse> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };

  const response = await axios.get(
    `${process.env.WEB_API_URL}/accounts?$select=name,accountid,revenue,telephone1,websiteurl,createdon,statecode&$count=true`,
    { headers }
  );

  return response.data;
};

export const fetchAccountById = async (token: string, accountId: string): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };

  const response = await axios.get(
    `${process.env.WEB_API_URL}/accounts(${accountId})`,
    { headers }
  );

  return response.data;
};
import { Request, Response } from 'express';
import { fetchAllAccounts, fetchAccountById } from '../services/accountServices';

interface AccountRequestBody {
  token: string;
  accountId?: string;
}

export const getAllAccounts = async (req: Request<{}, {}, AccountRequestBody>, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ error: 'Token is required' });
    return;
  }

  try {
    const accountsData = await fetchAllAccounts(token);

    res.status(200).json({
      success: true,
      message: 'Accounts fetched successfully',
      totalCount: accountsData['@odata.count'] || 0,
      data: accountsData.value,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error fetching accounts:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch accounts',
      details: error.response?.data || error.message
    });
  }
};

export const getAccountById = async (req: Request<{}, {}, AccountRequestBody>, res: Response): Promise<void> => {
  const { token, accountId } = req.body;

  if (!token || !accountId) {
    res.status(400).json({ error: 'Token and accountId are required' });
    return;
  }

  try {
    const accountData = await fetchAccountById(token, accountId);

    res.status(200).json({
      success: true,
      message: 'Account fetched successfully',
      data: accountData,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error fetching account:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch account',
      details: error.response?.data || error.message
    });
  }
};
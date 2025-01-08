import axios from 'axios';

const API_KEY = process.env.REACT_APP_FMP_API_KEY;
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

export const fetchFinancialData = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/income-statement/AAPL?period=annual&apikey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching financial data:', error);
    throw error;
  }
};
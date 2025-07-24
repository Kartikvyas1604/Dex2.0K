import { COINMARKETCAP_API_KEY } from '../config';

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

export async function getTokenPrice(symbol: string) {
  const url = `${BASE_URL}/cryptocurrency/quotes/latest?symbol=${symbol}`;
  const res = await fetch(url, {
    headers: {
      'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
    },
  });
  const data = await res.json();
  if (data.status && data.status.error_code === 0) {
    return data.data[symbol].quote.USD.price;
  }
  throw new Error(data.status.error_message || 'Failed to fetch price');
}

export async function getTokenHistorical(symbol: string, interval: string = '1h') {
  // CMC historical endpoint: /cryptocurrency/quotes/historical (for paid plans)
  // For free tier, use /cryptocurrency/ohlcv/historical
  const url = `${BASE_URL}/cryptocurrency/ohlcv/historical?symbol=${symbol}&interval=${interval}`;
  const res = await fetch(url, {
    headers: {
      'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
    },
  });
  const data = await res.json();
  if (data.status && data.status.error_code === 0) {
    return data.data.quotes;
  }
  throw new Error(data.status.error_message || 'Failed to fetch historical data');
} 
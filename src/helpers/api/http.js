import axios from 'axios';

const baseConfig = {
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  timeout: 60000,
  withCredentials: false,
};

async function GET(url) {
  const config = {
    ...baseConfig,
    url,
    method: 'get',
  };
  return axios(config);
}

export default {
  get GET() {
    return GET;
  },
};

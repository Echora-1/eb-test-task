// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const AUTH_TOKEN = '63ab652db85025784db873bcd17904932e4f97a2';

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.Authorization = `Token ${AUTH_TOKEN}`;

// eslint-disable-next-line import/prefer-default-export
export function getPartners() {
  return axios.get('api/partners').catch((err) => console.log(err));
}

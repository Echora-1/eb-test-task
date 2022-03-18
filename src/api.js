import axios from 'axios';

const AUTH_TOKEN = '63ab652db85025784db873bcd17904932e4f97a2';

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.Authorization = `Token ${AUTH_TOKEN}`;

export function getPartners() {
  return axios.get('api/partners');
}

export function blockPartner(externalId) {
  return axios.get(`api/partner/${externalId}/block`);
}

export function unblockPartner(externalId) {
  return axios.get(`api/partner/${externalId}/unblock`);
}

import axios from 'axios';

const backend_api = axios.create({
  withCredentials: true,
  baseURL: "https://ingestion-powerapp.azurewebsites.net",
});

export {
    backend_api
}

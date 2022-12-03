import axios from 'axios';

const backend_api = axios.create({
  withCredentials: true,
  baseURL:
    "backend_link",
});

export {
    backend_api
}

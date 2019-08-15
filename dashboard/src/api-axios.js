import axios from 'axios';

/** base url to make requests to the the movie database */
const instance = axios.create({
  baseURL: "https://api.tunzal.ml:8000/api"
});

export default instance;
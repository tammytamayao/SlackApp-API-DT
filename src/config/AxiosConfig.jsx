import axios from "axios";

const baseURL = "http://206.189.91.54/api/v1/";

const client = axios.create({
    baseURL: baseURL,
});

export { baseURL, client }
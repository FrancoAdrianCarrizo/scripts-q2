const axios = require("axios");
const getToken = require("../utils/getToken");
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const { headers } = await getToken();
    config.headers = headers;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

module.exports = { axiosApiInstance };

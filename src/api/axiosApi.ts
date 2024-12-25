import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://banhang.hcrm.online/api/",
  //baseURL:"https://lumiaicreations.com/sapo/tam-phuc/Backend-API-Print-Shop/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosApi;

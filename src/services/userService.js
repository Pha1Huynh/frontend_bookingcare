/* eslint-disable no-unused-vars */
import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
export { handleLoginApi };

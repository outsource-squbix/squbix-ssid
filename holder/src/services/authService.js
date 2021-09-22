import axios from "axios";
const AUTH_API_URL = "http://localhost:5000/auth";

export const signUp = (
  email,
  password,
  first_name,
  last_name,
  role = "holder"
) => {
  return axios.post(AUTH_API_URL + "/signup", {
    email,
    password,
    first_name,
    last_name,
    role,
  });
};

export const login = (email, password) => {
  return axios.post(AUTH_API_URL + "/login", {
    email,
    password,
  });
};

export const logout = () => {
  localStorage.removeItem("user");
};

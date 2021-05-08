import axios from "axios";

const axiosInst = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true
});
// axios.defaults.baseUrl = "http://localhost:6000";

export function getAllProducts() {
  return axiosInst.get("/products").then((resp) => resp.data);
}

export function logIn({ email, password }) {
  return axiosInst.post("/auth/login", { email, password });
}

export function isLoggedIn() {
  return axiosInst.get("/auth/is-logged-in");
}

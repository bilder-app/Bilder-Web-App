import axios from "axios";

const axiosInst = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
});
// axios.defaults.baseUrl = "http://localhost:6000";

export function getAllProducts() {
  return axiosInst.get("/business/products").then((res) => res.data);
}

export function getProductById(id) {
  return axiosInst.get(`business/products/${id}`).then((res) => res.data);
}

export function editProduct(id, data) {
  return axiosInst.put(`business/products/${id}`, data).then((res) => res.data);
}

export function deleteProduct(id) {
  return axiosInst.delete(`business/products/${id}`);
}

export function getMyProducts() {
  return axiosInst.get("/business/products").then((res) => res.data);
}

export function logIn({ email, password }) {
  return axiosInst.post("/auth/login", { email, password });
}

export function isLoggedIn() {
  return axiosInst.get("/auth/is-logged-in");
}

export function getMyBusiness() {
  return axiosInst.get("/business/me").then((res) => res.data);
}
export function addProduct(data) {
  return axiosInst.post("/business/products", data);
}

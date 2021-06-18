import axios from "axios";

const { NODE_ENV } = process.env;

const axiosInst = axios.create({
  baseURL:
    NODE_ENV === "production"
      ? "https://bilder-backend.herokuapp.com/"
      : "http://localhost:7000",
  withCredentials: true
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

export function getMyBusiness() {
  return axiosInst.get("/business/me").then((res) => res.data);
}

export function logIn({ email, password }) {
  return axiosInst.post("/auth/login", { email, password });
}

export function isLoggedIn() {
  return axiosInst.get("/auth/is-logged-in");
}

export function addProduct(data) {
  return axiosInst.post("/business/products", data);
}

/**
 * @typedef {Object} Product
 * @property {number} id - The ID
 * @property {number} businessId - The ID of the product's owner
 * @property {string} name - The name of the product
 * @property {string} description - The product's description
 * @property {number} price - The product's price
 * @property {number} stock - The product's stock
 * @property {string[]} images - The product's images
 * @property {string} createdAt - The date the product was created at as a string
 * @property {string} updatedAt - The date the product was updated at as a string
 * @property {string[]} offers - The product's offers
 */

/**
 * Searches the business' products and brings the ones
 * whose title are like the query
 * @param {number} query - The query to search for
 * @param {number} page - The pagination page
 * @param {number} limit - The maximum limit of products to bring
 * @return {Promise<{
 *        totalProducts: Number,
 *        next?: {
 *            page: Number,
 *            limit: Number
 *        },
 *        previous?: {
 *            page: Number,
 *            limit: Number
 *        },
 *        data: Product[]
 * }>}
 */
export function searchProducts(query, page = 1, limit = 25) {
  return axiosInst
    .get(`/business/products/search?query=${query}&page=${page}&limit=${limit}`)
    .then((resp) => resp.data);
}

export function getOrders() {
  return axiosInst.get("/business/orders").then((resp) => resp.data);
}

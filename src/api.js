import axios from "axios";

const axiosInst = axios.create({ baseURL: "http://localhost:5000" });
// axios.defaults.baseUrl = "http://localhost:6000";

export function getAllProducts() {
  return axiosInst.get("/product").then((resp) => resp.data);
}

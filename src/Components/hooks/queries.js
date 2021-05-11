import { useQuery } from "react-query";
import { getAllProducts, getProductById } from "../../api";

export function useGetAllProducts() {
  return useQuery("products", getAllProducts);
}

export function useGetProductById(id) {
  return useQuery(["products", id], () => getProductById(id));
}

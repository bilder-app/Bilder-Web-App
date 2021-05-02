import { useQuery } from "react-query";
import { getAllProducts } from "../../api";

export function useGetAllProducts() {
  return useQuery("products", getAllProducts);
}

import { useInfiniteQuery, useQuery } from "react-query";
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getMyBusiness,
} from "../../api";

export function useGetAllProducts() {
  return useQuery("products", getAllProducts);
}

export function useGetProductById(id) {
  return useQuery(["products", id], () => getProductById(id));
}
export function useMyBusiness() {
  return useQuery("me", getMyBusiness);
}

export function useGetPaginatedProductsSearch(query, page, limit) {
  return useInfiniteQuery(
    ["products", query, page, limit],
    ({ pageParam = page }) => searchProducts(query, pageParam, limit),
    { getNextPageParam: (lastPage) => lastPage.next.page }
  );
}

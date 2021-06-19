import { useInfiniteQuery, useQuery } from "react-query";
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getMyBusiness
} from "../../api";

export function useGetAllProducts() {
  return useQuery("products", getAllProducts);
}

export function useGetProductById(id, options = {}) {
  return useQuery(["products", id], () => getProductById(id), {
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    ...options
  });
}

export function useGetCategoriesByProductId(id) {
  return useQuery(["products", id], () => getProductById(id));
}

//

/**
 * @param {import("react-query").UseQueryOptions<any, unknown, any, "me">} options
 */
export function useMyBusiness(options) {
  return useQuery("me", getMyBusiness, options);
}

export function useGetPaginatedProductsSearch(query, page, limit) {
  return useInfiniteQuery(
    ["products", query, page, limit],
    ({ pageParam = page }) => searchProducts(query, pageParam, limit),
    { getNextPageParam: (lastPage) => lastPage.next.page }
  );
}

// "Store"
export function useOrderProducts(products) {
  return useQuery("products", products);
}

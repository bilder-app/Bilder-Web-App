import { useQuery } from "react-query";
import { getOrders } from "../../../api";

export function useGetAllOrders() {
  return useQuery("orders", getOrders);
}

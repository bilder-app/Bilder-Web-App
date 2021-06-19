import { useQuery } from "react-query";
import { getOrderById } from "../../../api";

export function useGetOrderById(orderId) {
  return useQuery(["orders", orderId], () => getOrderById(orderId));
}

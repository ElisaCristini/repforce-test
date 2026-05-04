import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { PaginatedProducts, ProductQuery } from "@repforce/shared";

export function useProducts(params: ProductQuery) {
  return useQuery<PaginatedProducts>({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await api.get<PaginatedProducts>("/products", {
        params,
      });
      return data;
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Product } from "@repforce/shared";

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CreateQuote, Quote } from "@repforce/shared";

export function useCreateQuote() {
  return useMutation<Quote, Error, CreateQuote>({
    mutationFn: async (data) => {
      const response = await api.post<Quote>("/quotes", data);
      return response.data;
    },
  });
}

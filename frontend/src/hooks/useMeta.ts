import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface Meta {
    categories: string[];
    brands: string[];
}

export function useMeta() {
    return useQuery<Meta>({
        queryKey: ["meta"],
        queryFn: async () => {
            const { data } = await api.get<Meta>("/products/meta");
            return data;
        },
    });
}
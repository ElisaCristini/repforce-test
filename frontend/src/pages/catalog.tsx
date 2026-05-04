import { useProducts } from "@/hooks/useProducts";

export function CatalogPage() {
  const { data, isLoading } = useProducts({
    page: 1,
    pageSize: 12,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.items.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.brand}</p>
            <p>R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

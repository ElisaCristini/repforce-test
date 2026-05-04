import { Card, CardContent } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export function CatalogPage() {
    const { data, isLoading, isError, error } = useProducts({
        page: 1,
        pageSize: 12,
    });

    console.log("DATA:", data);
    console.log("LOADING:", isLoading);
    console.log("ERROR STATE:", isError);
    console.log("ERROR DETAILS:", error);

    if (isLoading) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground">Carregando produtos...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                <p className="text-red-500">Erro ao carregar produtos</p>
            </div>
        );
    }

    if (!data || !data.items.length) {
        return (
            <div className="p-6">
                <p className="text-muted-foreground">Nenhum produto encontrado</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* HEADER */}
            <h1 className="text-2xl font-bold mb-6">Catálogo de Produtos</h1>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.items.map((product) => (
                    <Card
                        key={product.id}
                        className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                    >
                        {/* IMAGE */}
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-40 object-cover"
                        />

                        {/* CONTENT */}
                        <CardContent className="p-4 space-y-2">
                            <Badge variant="secondary">{product.category}</Badge>

                            <h2 className="font-semibold text-sm line-clamp-2">
                                {product.title}
                            </h2>

                            <p className="text-xs text-muted-foreground">
                                {product.brand}
                            </p>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between pt-2">
                                <span className="font-bold text-base">
                                    R$ {product.price.toFixed(2)}
                                </span>

                                <Button size="sm">Ver detalhes</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
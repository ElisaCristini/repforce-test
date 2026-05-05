import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { useMeta } from "@/hooks/useMeta";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";

function ProductSkeleton() {
    return (
        <Card className="overflow-hidden">
            <Skeleton className="w-full h-40" />
            <CardContent className="p-4 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24" />
                <div className="flex justify-between pt-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </CardContent>
        </Card>
    );
}

export function CatalogPage() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        inStock: false,
        page: 1,
    });

    const { data: meta } = useMeta();
    const { data, isLoading, isError } = useProducts({
        search: filters.search || undefined,
        category: filters.category || undefined,
        brand: filters.brand || undefined,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        inStock: filters.inStock || undefined,
        page: filters.page,
        pageSize: 12,
    });

    function handleClear() {
        setFilters({
            search: "",
            category: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            inStock: false,
            page: 1,
        });
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Catálogo de Produtos</h1>

            <div className="bg-muted/40 rounded-lg p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                    <Label>Buscar</Label>
                    <Input
                        placeholder="Nome do produto..."
                        value={filters.search}
                        onChange={(e) =>
                            setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))
                        }
                    />
                </div>

                <div className="space-y-1">
                    <Label>Categoria</Label>
                    <Select
                        value={filters.category}
                        onValueChange={(v) =>
                            setFilters((f) => ({ ...f, category: v === "all" ? "" : v, page: 1 }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            {meta?.categories.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label>Marca</Label>
                    <Select
                        value={filters.brand}
                        onValueChange={(v) =>
                            setFilters((f) => ({ ...f, brand: v === "all" ? "" : v, page: 1 }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            {meta?.brands.map((b) => (
                                <SelectItem key={b} value={b}>
                                    {b}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label>Faixa de preço</Label>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Mín"
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) =>
                                setFilters((f) => ({ ...f, minPrice: e.target.value, page: 1 }))
                            }
                        />
                        <Input
                            placeholder="Máx"
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) =>
                                setFilters((f) => ({ ...f, maxPrice: e.target.value, page: 1 }))
                            }
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6 sm:col-span-2 lg:col-span-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="inStock"
                            checked={filters.inStock}
                            onCheckedChange={(v) =>
                                setFilters((f) => ({ ...f, inStock: !!v, page: 1 }))
                            }
                        />
                        <Label htmlFor="inStock">Apenas em estoque</Label>
                    </div>
                    <Button variant="outline" onClick={handleClear}>
                        Limpar filtros
                    </Button>
                </div>
            </div>

            {isError && (
                <p className="text-red-500 mb-4">Erro ao carregar produtos.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading
                    ? Array.from({ length: 12 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))
                    : data?.items.map((product) => (
                        <Card
                            key={product.id}
                            className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-40 object-cover"
                            />
                            <CardContent className="p-4 space-y-2">
                                <div className="flex gap-2 flex-wrap">
                                    <Badge variant="secondary">{product.category}</Badge>
                                    {product.stock > 0 ? (
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                            Em estoque
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive">Esgotado</Badge>
                                    )}
                                </div>
                                <h2 className="font-semibold text-sm line-clamp-2">
                                    {product.title}
                                </h2>
                                <p className="text-xs text-muted-foreground">{product.brand}</p>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="font-bold text-base">
                                        {formatCurrency(product.price)}
                                    </span>
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            navigate({ to: "/produtos/$id", params: { id: product.id } })
                                        }
                                    >
                                        Ver detalhes
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>

            {!isLoading && data?.items.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    Nenhum produto encontrado.
                </div>
            )}

            {data && data.total > 12 && (
                <div className="flex justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        disabled={filters.page === 1}
                        onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                    >
                        Anterior
                    </Button>
                    <span className="flex items-center px-4 text-sm text-muted-foreground">
                        Página {filters.page} de {Math.ceil(data.total / 12)}
                    </span>
                    <Button
                        variant="outline"
                        disabled={filters.page >= Math.ceil(data.total / 12)}
                        onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                    >
                        Próxima
                    </Button>
                </div>
            )}
        </div>
    );
}

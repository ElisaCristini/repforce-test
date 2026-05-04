import { useParams, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/hooks/useProduct";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { ArrowLeft } from "lucide-react";

export function ProductPage() {
  const { id } = useParams({ from: "/produtos/$id" });
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-4">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="text-red-500">Produto não encontrado.</p>
        <Button className="mt-4" onClick={() => navigate({ to: "/" })}>
          Voltar ao catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: "/" })}
        className="gap-2"
      >
        <ArrowLeft size={16} />
        Voltar ao catálogo
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <img
            src={product.images[selectedImage]}
            alt={product.title}
            className="w-full h-80 object-cover rounded-lg border"
          />
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.title} ${i + 1}`}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all ${
                  selectedImage === i
                    ? "border-primary"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
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

          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground">{product.brand}</p>
          <p className="text-3xl font-bold">{formatCurrency(product.price)}</p>

          <Separator />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">SKU</p>
              <p className="font-medium">{product.sku}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estoque</p>
              <p className="font-medium">{product.stock} unidades</p>
            </div>
            <div>
              <p className="text-muted-foreground">Peso</p>
              <p className="font-medium">{product.weightKg} kg</p>
            </div>
            <div>
              <p className="text-muted-foreground">Garantia</p>
              <p className="font-medium">{product.warrantyMonths} meses</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cadastrado em</p>
              <p className="font-medium">{formatDate(product.createdAt)}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-semibold mb-2">Descrição</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

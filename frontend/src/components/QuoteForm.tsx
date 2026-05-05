import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createQuoteSchema } from "@repforce/shared";
import type { CreateQuote } from "@repforce/shared";
import { useCreateQuote } from "@/hooks/useCreateQuote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMaskInput } from "react-imask";
import { useState } from "react";

interface QuoteFormProps {
  productId: string;
  maxQuantity: number;
}

export function QuoteForm({ productId, maxQuantity }: QuoteFormProps) {
  const [success, setSuccess] = useState(false);
  const { mutate, isPending } = useCreateQuote();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateQuote>({
    resolver: zodResolver(
      createQuoteSchema.refine((d) => d.quantity <= maxQuantity, {
        message: `Quantidade máxima disponível: ${maxQuantity}`,
        path: ["quantity"],
      })
    ),
    defaultValues: { productId },
  });

  function onSubmit(data: CreateQuote) {
    mutate(data, {
      onSuccess: () => {
        setSuccess(true);
        reset({ productId });
        setTimeout(() => setSuccess(false), 5000);
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Solicitar Cotação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome */}
          <div className="space-y-1">
            <Label htmlFor="fullName">Nome completo</Label>
            <Input id="fullName" {...register("fullName")} placeholder="Seu nome completo" />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div className="space-y-1">
            <Label htmlFor="phone">Telefone</Label>
            <IMaskInput
              id="phone"
              mask="(00) 00000-0000"
              placeholder="(00) 00000-0000"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onAccept={(value: string) => {
                const digits = value.replace(/\D/g, "");
                setValue("phone", digits, { shouldValidate: true });
              }}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Empresa */}
          <div className="space-y-1">
            <Label htmlFor="company">Empresa</Label>
            <Input id="company" {...register("company")} placeholder="Nome da empresa" />
            {errors.company && (
              <p className="text-xs text-red-500">{errors.company.message}</p>
            )}
          </div>

          {/* Quantidade */}
          <div className="space-y-1">
            <Label htmlFor="quantity">Quantidade desejada</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              max={maxQuantity}
              {...register("quantity", { valueAsNumber: true })}
              placeholder={`Máx: ${maxQuantity}`}
            />
            {errors.quantity && (
              <p className="text-xs text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          {/* Observações */}
          <div className="space-y-1">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <textarea
              id="notes"
              {...register("notes")}
              maxLength={500}
              placeholder="Informações adicionais..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
            />
            {errors.notes && (
              <p className="text-xs text-red-500">{errors.notes.message}</p>
            )}
          </div>

          {/* Sucesso */}
          {success && (
            <p className="text-sm text-green-600 font-medium">
              ✓ Cotação solicitada com sucesso!
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Enviando..." : "Solicitar Cotação"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

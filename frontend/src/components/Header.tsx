import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ShoppingBag } from "lucide-react";

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag size={22} className="text-primary" />
          <span className="font-bold text-lg tracking-tight">Repforce</span>
          <span className="text-muted-foreground text-sm hidden sm:block">
            — Catálogo de Produtos
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
    </header>
  );
}

import Link from "next/link"
import { ShoppingBag, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

type Props = {
  countryCode: string
}

export function Header({ countryCode }: Props) {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${countryCode}`} className="text-xl font-bold tracking-tight">
          STORE
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={`/${countryCode}/store`}
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Shop
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${countryCode}/store`}>
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${countryCode}/account`}>
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${countryCode}/cart`}>
              <ShoppingBag className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

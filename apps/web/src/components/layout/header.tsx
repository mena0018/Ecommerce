import Link from "next/link"
import { ShoppingBag, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"

type Props = {
  countryCode: string
}

export function Header({ countryCode }: Props) {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href={`/${countryCode}`}
          className="text-foreground text-xs font-medium tracking-widest uppercase transition-colors hover:opacity-70"
        >
          STORE
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={`/${countryCode}/store`}
            className="text-muted-foreground hover:text-foreground text-xs font-medium tracking-wider uppercase transition-colors duration-150"
          >
            Shop
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${countryCode}/store`} aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${countryCode}/account`} aria-label="Account">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/${countryCode}/cart`} aria-label="Cart">
              <ShoppingBag className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

import Link from "next/link"

type Props = {
  countryCode: string
}

export function Footer({ countryCode }: Props) {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p className="text-foreground text-xs font-medium tracking-widest uppercase">STORE</p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Carefully made clothes for everyday life.
            </p>
          </div>
          <div>
            <p className="text-foreground text-xs font-medium tracking-wider uppercase">Shop</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href={`/${countryCode}/store`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  All products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-foreground text-xs font-medium tracking-wider uppercase">Account</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href={`/${countryCode}/account`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  My account
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/cart`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-border text-muted-foreground mt-16 border-t pt-8 text-xs tracking-wide">
          &copy; {new Date().getFullYear()} Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

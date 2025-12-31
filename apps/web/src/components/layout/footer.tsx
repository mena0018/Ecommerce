import Link from "next/link"

type Props = {
  countryCode: string
}

export function Footer({ countryCode }: Props) {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold">STORE</h3>
            <p className="text-muted-foreground mt-2 text-sm">A modern ecommerce experience.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href={`/${countryCode}/store`}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  All products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href={`/${countryCode}/account`}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  My account
                </Link>
              </li>
              <li>
                <Link
                  href={`/${countryCode}/cart`}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Store. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

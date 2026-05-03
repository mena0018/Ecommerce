import Image from "next/image"
import Link from "next/link"
import { HttpTypes } from "@medusajs/types"

type Props = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export function ProductCard({ product, countryCode }: Props) {
  const price = product.variants?.[0]?.calculated_price

  return (
    <Link href={`/${countryCode}/products/${product.handle}`} className="group block">
      <div className="bg-card aspect-square overflow-hidden rounded-md">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title ?? ""}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-foreground truncate text-sm font-medium">{product.title}</h3>
        {price?.calculated_amount && (
          <p className="text-muted-foreground shrink-0 text-sm">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: price.currency_code ?? "EUR"
            }).format(price.calculated_amount)}
          </p>
        )}
      </div>
    </Link>
  )
}

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
    <Link href={`/${countryCode}/products/${product.handle}`} className="group">
      <div className="bg-muted aspect-square overflow-hidden rounded-lg">
        {product.thumbnail && (
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium">{product.title}</h3>
        {price && price.calculated_amount && (
          <p className="text-muted-foreground text-sm">
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

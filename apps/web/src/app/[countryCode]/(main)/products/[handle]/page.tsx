import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductByHandle } from "@/data/products"
import { getRegion } from "@/data/regions"
import { AddToCartButton } from "@/components/product/add-to-cart-button"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export default async function ProductPage({ params }: Props) {
  const { countryCode, handle } = await params
  const region = await getRegion(countryCode)

  if (!region) return notFound()

  const product = await getProductByHandle(handle, region.id)

  if (!product) return notFound()

  const price = product.variants?.[0]?.calculated_price

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="bg-muted aspect-square overflow-hidden rounded-lg">
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={800}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            {price && (
              <p className="text-muted-foreground mt-2 text-2xl">
                {price.calculated_amount &&
                  new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: price.currency_code ?? "EUR"
                  }).format(price.calculated_amount)}
              </p>
            )}
          </div>

          {product.description && <p className="text-muted-foreground">{product.description}</p>}

          <AddToCartButton variantId={product.variants?.[0]?.id} countryCode={countryCode} />
        </div>
      </div>
    </div>
  )
}

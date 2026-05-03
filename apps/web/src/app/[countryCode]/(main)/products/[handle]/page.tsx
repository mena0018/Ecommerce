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
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20">
        <div className="bg-card aspect-square overflow-hidden rounded-md">
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title ?? ""}
              width={800}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          )}
        </div>

        <div className="flex flex-col gap-8 md:py-4">
          <div className="flex flex-col gap-3">
            <h1
              className="text-foreground leading-tight font-light tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              {product.title}
            </h1>
            {price?.calculated_amount && (
              <p className="text-muted-foreground text-lg font-light">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: price.currency_code ?? "EUR"
                }).format(price.calculated_amount)}
              </p>
            )}
          </div>

          {product.description && (
            <p className="text-muted-foreground max-w-[52ch] text-sm leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="mt-2">
            <AddToCartButton variantId={product.variants?.[0]?.id} countryCode={countryCode} />
          </div>
        </div>
      </div>
    </div>
  )
}

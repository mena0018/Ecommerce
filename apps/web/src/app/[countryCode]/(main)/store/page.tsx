import { listProducts } from "@/data/products"
import { getRegion } from "@/data/regions"
import { ProductCard } from "@/components/product/product-card"

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function StorePage({ params }: Props) {
  const { countryCode } = await params
  const region = await getRegion(countryCode)

  if (!region) {
    return <div className="py-12 text-center">Region not found</div>
  }

  const { response } = await listProducts({
    regionId: region.id,
    queryParams: { limit: 20 }
  })

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="mb-12 flex items-end justify-between">
        <h1 className="text-foreground text-xs font-medium tracking-widest uppercase">
          All Products
          <span className="text-muted-foreground ml-2 font-normal">
            ({response.products.length})
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {response.products.map((product) => (
          <ProductCard key={product.id} product={product} countryCode={countryCode} />
        ))}
      </div>
    </div>
  )
}

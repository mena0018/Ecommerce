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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">All Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {response.products.map((product) => (
          <ProductCard key={product.id} product={product} countryCode={countryCode} />
        ))}
      </div>
    </div>
  )
}

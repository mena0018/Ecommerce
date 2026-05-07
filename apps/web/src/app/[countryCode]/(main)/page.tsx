import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function HomePage({ params }: Props) {
  const { countryCode } = await params

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Welcome to the Store</h1>
      <p className="text-muted-foreground max-w-lg text-lg">
        Discover our curated collection of products.
      </p>
      <Button asChild size="lg">
        <Link href={`/${countryCode}/store`}>Browse products</Link>
      </Button>
    </div>
  )
}

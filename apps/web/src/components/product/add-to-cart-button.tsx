"use client"

import { useTransition } from "react"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/data/cart"

type Props = {
  variantId?: string
  countryCode: string
}

export function AddToCartButton({ variantId, countryCode }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleAddToCart = () => {
    if (!variantId) return

    startTransition(async () => {
      await addToCart({
        variantId,
        quantity: 1,
        countryCode
      })
    })
  }

  return (
    <Button onClick={handleAddToCart} disabled={!variantId || isPending} size="lg">
      <ShoppingBag className="h-4 w-4" />
      {isPending ? "Adding..." : "Add to cart"}
    </Button>
  )
}

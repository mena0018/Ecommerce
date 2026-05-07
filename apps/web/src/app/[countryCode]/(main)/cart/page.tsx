import Link from "next/link"
import { retrieveCart } from "@/data/cart"
import { Button } from "@/components/ui/button"

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function CartPage({ params }: Props) {
  const { countryCode } = await params
  const cart = await retrieveCart()

  if (!cart || !cart.items?.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Button asChild>
          <Link href={`/${countryCode}/store`}>Continue shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Shopping Cart</h1>
      <div className="divide-y">
        {cart.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <div className="bg-muted h-20 w-20 rounded-md" />
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-muted-foreground text-sm">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: cart.currency_code ?? "EUR"
              }).format(item.total ?? 0)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t pt-8">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-lg font-semibold">
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: cart.currency_code ?? "EUR"
          }).format(cart.total ?? 0)}
        </span>
      </div>
      <div className="mt-6">
        <Button asChild size="lg" className="w-full">
          <Link href={`/${countryCode}/checkout`}>Proceed to checkout</Link>
        </Button>
      </div>
    </div>
  )
}

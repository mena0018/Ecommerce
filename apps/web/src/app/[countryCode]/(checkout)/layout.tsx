import { Fragment } from "react"
import Link from "next/link"
import { PropsWithChildren } from "react"

type Props = PropsWithChildren<{
  params: Promise<{ countryCode: string }>
}>

export default async function CheckoutLayout({ children, params }: Props) {
  const { countryCode } = await params

  return (
    <Fragment>
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href={`/${countryCode}`} className="text-xl font-bold tracking-tight">
            STORE
          </Link>
        </div>
      </header>
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </Fragment>
  )
}

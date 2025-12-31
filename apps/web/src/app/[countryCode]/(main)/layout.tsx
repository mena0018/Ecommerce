import { Fragment, PropsWithChildren } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

type Props = PropsWithChildren<{
  params: Promise<{ countryCode: string }>
}>

export default async function MainLayout({ children, params }: Props) {
  const { countryCode } = await params

  return (
    <Fragment>
      <Header countryCode={countryCode} />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      <Footer countryCode={countryCode} />
    </Fragment>
  )
}

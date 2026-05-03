import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Props = {
  params: Promise<{ countryCode: string }>
}

export default async function HomePage({ params }: Props) {
  const { countryCode } = await params

  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[85svh] flex-col justify-end overflow-hidden bg-[oklch(0.14_0.005_35)]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, oklch(0.62 0.09 35 / 0.3) 0%, transparent 70%)"
          }}
          aria-hidden
        />

        <div className="relative z-10 px-6 pb-16 lg:px-12 lg:pb-24">
          <p className="mb-5 text-xs font-medium tracking-[0.12em] text-[oklch(0.98_0.005_35/0.5)] uppercase">
            New Collection
          </p>
          <h1
            className="leading-[1.05] font-light tracking-[-0.03em] text-[oklch(0.98_0.005_35)]"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
          >
            Wear Less.
            <br />
            Feel More.
          </h1>
          <div className="mt-10">
            <Link
              href={`/${countryCode}/store`}
              className="inline-flex items-center gap-3 border-b border-[oklch(0.98_0.005_35/0.3)] pb-1 text-sm font-medium text-[oklch(0.98_0.005_35)] transition-all duration-150 hover:gap-4 hover:border-[oklch(0.98_0.005_35/0.8)]"
            >
              Discover the collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-border border-b px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground mb-4 text-xs font-medium tracking-widest uppercase">
                The Edit
              </p>
              <h2
                className="text-foreground leading-[1.1] font-light tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                Essential pieces,
                <br />
                considered quality.
              </h2>
            </div>
            <div className="flex flex-col gap-6 md:items-end">
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:text-right">
                A focused selection of everyday basics. Sweatshirts, t-shirts, and more — made to
                last, designed to disappear into your wardrobe.
              </p>
              <Link
                href={`/${countryCode}/store`}
                className="text-foreground border-border hover:border-brand inline-flex items-center gap-2 border-b pb-0.5 text-xs font-medium tracking-widest uppercase transition-colors duration-150"
              >
                Shop all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="bg-card aspect-3/4 rounded-md" />
            <div className="bg-card aspect-3/4 rounded-md sm:translate-y-8" />
            <div className="bg-card aspect-3/4 rounded-md" />
          </div>
          <div className="mt-16 flex justify-center">
            <Link
              href={`/${countryCode}/store`}
              className="bg-primary text-primary-foreground hover:bg-brand inline-flex items-center gap-3 px-10 py-3 text-xs font-medium tracking-widest uppercase transition-colors duration-150"
            >
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

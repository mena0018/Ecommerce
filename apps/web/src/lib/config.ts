import { getLocaleHeader } from "@/utils/get-locale-header"
import Medusa, { FetchArgs, FetchInput } from "@medusajs/js-sdk"
import { env } from "@/lib/env"

export const sdk = new Medusa({
  baseUrl: env.MEDUSA_BACKEND_URL,
  debug: env.NODE_ENV === "development",
  publishableKey: env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
})

const originalFetch = sdk.client.fetch.bind(sdk.client)

sdk.client.fetch = async <T>(input: FetchInput, init?: FetchArgs): Promise<T> => {
  const headers = init?.headers ?? {}
  let localeHeader: Record<string, string | null> | undefined
  try {
    localeHeader = await getLocaleHeader()
    const localeValue = localeHeader["x-medusa-locale"]
    if (localeValue != null) {
      headers["x-medusa-locale"] ??= localeValue
    }
  } catch {
    console.error("Failed to get locale header, proceeding without it.")
  }

  const newHeaders = {
    ...localeHeader,
    ...headers
  }
  init = {
    ...init,
    headers: newHeaders
  }
  return originalFetch(input, init)
}

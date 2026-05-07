import { FetchError } from "@medusajs/js-sdk"

export function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

export function isNotFound(error: unknown): boolean {
  return error instanceof FetchError && (error.status === 401 || error.status === 404)
}

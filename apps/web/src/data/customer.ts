"use server"

import { sdk } from "@/lib/config"
import { isNotFound, toErrorMessage } from "@/utils/error"
import { HttpTypes } from "@medusajs/types"
import { z } from "zod"
import { updateTag } from "next/cache"
import { redirect } from "next/navigation"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken
} from "./cookies"

export const retrieveCustomer = async (): Promise<HttpTypes.StoreCustomer | null> => {
  const authHeaders = await getAuthHeaders()

  if (!authHeaders) return null

  const headers = {
    ...authHeaders
  }

  const next = {
    ...(await getCacheOptions("customers"))
  }

  return await sdk.client
    .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
      method: "GET",
      query: {
        fields: "*orders"
      },
      headers,
      next,
      cache: "force-cache"
    })
    .then(({ customer }) => customer)
    .catch((err: unknown) => {
      if (isNotFound(err)) return null
      throw err
    })
}

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = {
    ...(await getAuthHeaders())
  }

  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)

  const cacheTag = await getCacheTag("customers")
  updateTag(cacheTag)

  return updateRes
}

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password
    })

    await setAuthToken(token as string)

    const headers = {
      ...(await getAuthHeaders())
    }

    const { customer: createdCustomer } = await sdk.store.customer.create(customerForm, {}, headers)

    const loginToken = await sdk.auth.login("customer", "emailpass", {
      email: customerForm.email,
      password
    })

    await setAuthToken(loginToken as string)

    const customerCacheTag = await getCacheTag("customers")
    updateTag(customerCacheTag)

    await transferCart()

    return createdCustomer
  } catch (error: unknown) {
    return toErrorMessage(error)
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await sdk.auth.login("customer", "emailpass", { email, password }).then(async (token) => {
      await setAuthToken(token as string)
      const customerCacheTag = await getCacheTag("customers")
      updateTag(customerCacheTag)
    })
  } catch (error: unknown) {
    return toErrorMessage(error)
  }

  try {
    await transferCart()
  } catch (error: unknown) {
    return toErrorMessage(error)
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()

  await removeAuthToken()

  const customerCacheTag = await getCacheTag("customers")
  updateTag(customerCacheTag)

  await removeCartId()

  const cartCacheTag = await getCacheTag("carts")
  updateTag(cartCacheTag)

  redirect(`/${countryCode}/account`)
}

export async function transferCart() {
  const cartId = await getCartId()

  if (!cartId) {
    return
  }

  const headers = await getAuthHeaders()

  await sdk.store.cart.transferCart(cartId, {}, headers)

  const cartCacheTag = await getCacheTag("carts")
  updateTag(cartCacheTag)
}

type AddressActionResult = { success: boolean; error: string | null }

const customerAddressSchema = z.object({
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  company: z.string().nullable(),
  address_1: z.string().min(1),
  address_2: z.string().nullable(),
  city: z.string().nullable(),
  postal_code: z.string().nullable(),
  province: z.string().nullable(),
  country_code: z.string().length(2),
  phone: z.string().nullable()
})

const parseAddressForm = (formData: FormData) =>
  customerAddressSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    company: formData.get("company"),
    address_1: formData.get("address_1"),
    address_2: formData.get("address_2"),
    city: formData.get("city"),
    postal_code: formData.get("postal_code"),
    province: formData.get("province"),
    country_code: formData.get("country_code"),
    phone: formData.get("phone")
  })

export const addCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<AddressActionResult> => {
  const parsed = parseAddressForm(formData)
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid address" }

  const headers = { ...(await getAuthHeaders()) }

  return sdk.store.customer
    .createAddress(
      {
        ...parsed.data,
        is_default_billing: (currentState.isDefaultBilling as boolean) ?? false,
        is_default_shipping: (currentState.isDefaultShipping as boolean) ?? false
      },
      {},
      headers
    )
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      updateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err: unknown) => ({ success: false, error: toErrorMessage(err) }))
}

export const deleteCustomerAddress = async (addressId: string): Promise<void> => {
  const headers = {
    ...(await getAuthHeaders())
  }

  await sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      updateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err: unknown) => ({ success: false, error: toErrorMessage(err) }))
}

export const updateCustomerAddress = async (
  currentState: Record<string, unknown>,
  formData: FormData
): Promise<AddressActionResult> => {
  const addressId = (currentState.addressId as string) || (formData.get("addressId") as string)
  if (!addressId) return { success: false, error: "Address ID is required" }

  const parsed = parseAddressForm(formData)
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid address" }

  const headers = { ...(await getAuthHeaders()) }

  return sdk.store.customer
    .updateAddress(addressId, parsed.data, {}, headers)
    .then(async () => {
      const customerCacheTag = await getCacheTag("customers")
      updateTag(customerCacheTag)
      return { success: true, error: null }
    })
    .catch((err: unknown) => ({ success: false, error: toErrorMessage(err) }))
}

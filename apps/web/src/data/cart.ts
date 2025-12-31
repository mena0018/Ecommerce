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
  removeCartId,
  setCartId
} from "./cookies"
import { getRegion } from "./regions"
import { getLocale } from "@/data/locale-actions"

/**
 * Retrieves a cart by its ID. If no ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to retrieve.
 * @returns The cart object if found, or null if not found.
 */
export async function retrieveCart(cartId?: string, fields?: string) {
  const id = cartId || (await getCartId())
  fields ??=
    "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name"

  if (!id) {
    return null
  }

  const headers = {
    ...(await getAuthHeaders())
  }

  const next = {
    ...(await getCacheOptions("carts"))
  }

  return await sdk.client
    .fetch<HttpTypes.StoreCartResponse>(`/store/carts/${id}`, {
      method: "GET",
      query: {
        fields
      },
      headers,
      next,
      cache: "force-cache"
    })
    .then(({ cart }: { cart: HttpTypes.StoreCart }) => cart)
    .catch((err: unknown) => {
      if (isNotFound(err)) return null
      throw err
    })
}

export async function getOrSetCart(countryCode: string) {
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  let cart = await retrieveCart(undefined, "id,region_id")

  const headers = {
    ...(await getAuthHeaders())
  }

  if (!cart) {
    const locale = await getLocale()
    const cartResp = await sdk.store.cart.create(
      { region_id: region.id, locale: locale || undefined },
      {},
      headers
    )
    cart = cartResp.cart

    await setCartId(cart.id)

    const cartCacheTag = await getCacheTag("carts")
    updateTag(cartCacheTag)
  }

  if (cart && cart?.region_id !== region.id) {
    await sdk.store.cart.update(cart.id, { region_id: region.id }, {}, headers)
    const cartCacheTag = await getCacheTag("carts")
    updateTag(cartCacheTag)
  }

  return cart
}

export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found, please create one before updating")
  }

  const headers = {
    ...(await getAuthHeaders())
  }

  return sdk.store.cart
    .update(cartId, data, {}, headers)
    .then(async ({ cart }: { cart: HttpTypes.StoreCart }) => {
      const cartCacheTag = await getCacheTag("carts")
      updateTag(cartCacheTag)

      const fulfillmentCacheTag = await getCacheTag("fulfillment")
      updateTag(fulfillmentCacheTag)

      return cart
    })
}

export async function addToCart({
  variantId,
  quantity,
  countryCode
}: {
  variantId: string
  quantity: number
  countryCode: string
}) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart")
  }

  const cart = await getOrSetCart(countryCode)

  if (!cart) {
    throw new Error("Error retrieving or creating cart")
  }

  const headers = {
    ...(await getAuthHeaders())
  }

  await sdk.store.cart
    .createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity
      },
      {},
      headers
    )
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      updateTag(cartCacheTag)

      const fulfillmentCacheTag = await getCacheTag("fulfillment")
      updateTag(fulfillmentCacheTag)
    })
}

export async function updateLineItem({ lineId, quantity }: { lineId: string; quantity: number }) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when updating line item")
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("Missing cart ID when updating line item")
  }

  const headers = {
    ...(await getAuthHeaders())
  }

  await sdk.store.cart.updateLineItem(cartId, lineId, { quantity }, {}, headers).then(async () => {
    const cartCacheTag = await getCacheTag("carts")
    updateTag(cartCacheTag)

    const fulfillmentCacheTag = await getCacheTag("fulfillment")
    updateTag(fulfillmentCacheTag)
  })
}

export async function deleteLineItem(lineId: string) {
  if (!lineId) {
    throw new Error("Missing lineItem ID when deleting line item")
  }

  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("Missing cart ID when deleting line item")
  }

  const headers = {
    ...(await getAuthHeaders())
  }

  await sdk.store.cart.deleteLineItem(cartId, lineId, {}, headers).then(async () => {
    const cartCacheTag = await getCacheTag("carts")
    updateTag(cartCacheTag)

    const fulfillmentCacheTag = await getCacheTag("fulfillment")
    updateTag(fulfillmentCacheTag)
  })
}

export async function setShippingMethod({
  cartId,
  shippingMethodId
}: {
  cartId: string
  shippingMethodId: string
}) {
  const headers = {
    ...(await getAuthHeaders())
  }

  return sdk.store.cart
    .addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      updateTag(cartCacheTag)
    })
}

export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession
) {
  const headers = {
    ...(await getAuthHeaders())
  }

  return sdk.store.payment.initiatePaymentSession(cart, data, {}, headers).then(async (resp) => {
    const cartCacheTag = await getCacheTag("carts")
    updateTag(cartCacheTag)
    return resp
  })
}

export async function applyPromotions(codes: string[]) {
  const cartId = await getCartId()

  if (!cartId) {
    throw new Error("No existing cart found")
  }

  const headers = {
    ...(await getAuthHeaders())
  }

  return sdk.store.cart.update(cartId, { promo_codes: codes }, {}, headers).then(async () => {
    const cartCacheTag = await getCacheTag("carts")
    updateTag(cartCacheTag)

    const fulfillmentCacheTag = await getCacheTag("fulfillment")
    updateTag(fulfillmentCacheTag)
  })
}

export async function submitPromotionForm(currentState: unknown, formData: FormData) {
  const code = formData.get("code") as string
  try {
    await applyPromotions([code])
  } catch (e: unknown) {
    return toErrorMessage(e)
  }
}

const addressSchema = z.object({
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  address_1: z.string().min(1),
  address_2: z.string().default(""),
  company: z.string().nullable(),
  postal_code: z.string().nullable(),
  city: z.string().nullable(),
  country_code: z.string().length(2),
  province: z.string().nullable(),
  phone: z.string().nullable()
})

const setAddressesSchema = z.object({
  email: z.email(),
  same_as_billing: z.literal("on").optional(),
  shipping_address: addressSchema,
  billing_address: addressSchema.optional()
})

export async function setAddresses(currentState: unknown, formData: FormData) {
  const cartId = getCartId()
  if (!cartId) return "No existing cart found when setting addresses"

  const raw = {
    email: formData.get("email"),
    same_as_billing: formData.get("same_as_billing"),
    shipping_address: {
      first_name: formData.get("shipping_address.first_name"),
      last_name: formData.get("shipping_address.last_name"),
      address_1: formData.get("shipping_address.address_1"),
      address_2: "",
      company: formData.get("shipping_address.company"),
      postal_code: formData.get("shipping_address.postal_code"),
      city: formData.get("shipping_address.city"),
      country_code: formData.get("shipping_address.country_code"),
      province: formData.get("shipping_address.province"),
      phone: formData.get("shipping_address.phone")
    },
    billing_address: {
      first_name: formData.get("billing_address.first_name"),
      last_name: formData.get("billing_address.last_name"),
      address_1: formData.get("billing_address.address_1"),
      address_2: "",
      company: formData.get("billing_address.company"),
      postal_code: formData.get("billing_address.postal_code"),
      city: formData.get("billing_address.city"),
      country_code: formData.get("billing_address.country_code"),
      province: formData.get("billing_address.province"),
      phone: formData.get("billing_address.phone")
    }
  }

  const parsed = setAddressesSchema.safeParse(raw)
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Invalid form data"

  const { email, same_as_billing, shipping_address, billing_address } = parsed.data

  try {
    await updateCart({
      email,
      shipping_address,
      billing_address: same_as_billing === "on" ? shipping_address : billing_address
    })
  } catch (e: unknown) {
    return toErrorMessage(e)
  }

  redirect(`/${parsed.data.shipping_address.country_code}/checkout?step=delivery`)
}

/**
 * Places an order for a cart. If no cart ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to place an order for.
 * @returns The cart object if the order was successful, or null if not.
 */
export async function placeOrder(cartId?: string) {
  const id = cartId || (await getCartId())

  if (!id) {
    throw new Error("No existing cart found when placing an order")
  }

  const headers = {
    ...(await getAuthHeaders())
  }

  const cartRes = await sdk.store.cart.complete(id, {}, headers).then(async (cartRes) => {
    const cartCacheTag = await getCacheTag("carts")
    updateTag(cartCacheTag)
    return cartRes
  })

  if (cartRes?.type === "order") {
    const countryCode = cartRes.order.shipping_address?.country_code?.toLowerCase()

    const orderCacheTag = await getCacheTag("orders")
    updateTag(orderCacheTag)

    removeCartId()
    redirect(`/${countryCode}/order/${cartRes?.order.id}/confirmed`)
  }

  return cartRes.cart
}

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(countryCode: string, currentPath: string) {
  const cartId = await getCartId()
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  if (cartId) {
    await updateCart({ region_id: region.id })
    const cartCacheTag = await getCacheTag("carts")
    updateTag(cartCacheTag)
  }

  const regionCacheTag = await getCacheTag("regions")
  updateTag(regionCacheTag)

  const productsCacheTag = await getCacheTag("products")
  updateTag(productsCacheTag)

  redirect(`/${countryCode}${currentPath}`)
}

export async function listCartOptions() {
  const cartId = await getCartId()
  const headers = {
    ...(await getAuthHeaders())
  }
  const next = {
    ...(await getCacheOptions("shippingOptions"))
  }

  return await sdk.client.fetch<{
    shipping_options: HttpTypes.StoreCartShippingOption[]
  }>("/store/shipping-options", {
    query: { cart_id: cartId },
    next,
    headers,
    cache: "force-cache"
  })
}

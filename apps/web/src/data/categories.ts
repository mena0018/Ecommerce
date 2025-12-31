import { sdk } from "@/lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const listCategories = async (query?: HttpTypes.StoreProductCategoryListParams) => {
  const next = {
    ...(await getCacheOptions("categories"))
  }

  const limit = query?.limit ?? 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>("/store/product-categories", {
      query: {
        fields: "*category_children, *products, *parent_category, *parent_category.parent_category",
        limit,
        ...query
      },
      next,
      cache: "force-cache"
    })
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const next = {
    ...(await getCacheOptions("categories"))
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(`/store/product-categories`, {
      query: {
        fields: "*category_children, *products",
        handle
      },
      next,
      cache: "force-cache"
    })
    .then(({ product_categories }) => {
      if (!product_categories[0])
        throw new Error(`Category not found for handle: ${categoryHandle.join("/")}`)
      return product_categories[0]
    })
}

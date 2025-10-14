'use client'

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

interface ProductListProps {
  category?: string
}

function ProductList({ category }: ProductListProps) {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({ category }))

  return (
    <div>
      <h1>Product List</h1>
      {JSON.stringify(data)}
    </div>
  )
}

export const ProductListLoading = () => {
  return (
    <div>Loading...</div>
  )
}

export default ProductList

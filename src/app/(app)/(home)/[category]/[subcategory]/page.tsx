import ProductList, {
  ProductListLoading,
} from "@/modules/products/ui/components/product-list"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"

interface PageProps {
  params: Promise<{ subcategory: string }>
}

async function Page({ params }: PageProps) {
  const { subcategory } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListLoading />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page

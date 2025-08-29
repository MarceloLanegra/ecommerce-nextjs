interface PageProps {
  params: Promise<{
    category: string
    subcategory: string
  }>
}

async function Page({ params }: PageProps) {
  const { category, subcategory } = await params

  return (
    <div>
      <h1>Category: {category}/{subcategory}</h1>
    </div>
  )
}

export default Page

interface PageProps {
  params: Promise<{
    category: string
  }>
}

async function Page({ params }: PageProps) {
  const { category } = await params

  return (
    <div>
      <h1>Category: {category}</h1>
    </div>
  )
}

export default Page

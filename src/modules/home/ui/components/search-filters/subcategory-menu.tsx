import Link from "next/link"
import { Category } from "@/payload-types"
import { CategoriesGetManyOutput } from "@/modules/categories/types"
import { DEFAULT_BG_COLOR } from "@/modules/home/constants"

interface SubcategoryMenuProps {
  category: CategoriesGetManyOutput[1]
  isOpen: boolean
  position: { top: number; left: number }
}

function SubcategoryMenu({ category, isOpen, position }: SubcategoryMenuProps) {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0)
    return null

  const backgroundColor = category.color || DEFAULT_BG_COLOR

  return (
    <div
      className='fixed z-100'
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className='h-3 w-60' />
      <div
        style={{ backgroundColor }}
        className='w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]'
      >
        <div>
          {category.subcategories?.map((subcategory: Category) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium'
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubcategoryMenu

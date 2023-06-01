
import { Recipe } from "../contexts/RecipesContext"
import { Link } from "react-router-dom"

interface Props {
  
  data: Recipe
}

const RecipeCard = ({ data }: Props) => {
  const { title, tags, $id,authorName,thumbnail } = data
  
  return (
    <Link to={`/recipes/${data?.$id}`} >
    <div className="hover:p-1 rounded-xl bg-rose-100/100 hover:border border-rose-200 hover:shadow-xl hover:scale-105 duration-200 ease-out">
      <div className="bg-white rounded-xl border border-rose-300 hover:shadow overflow-hidden">
      <img src={thumbnail} alt="" className="aspect-video object-cover object-center bg-gray-200" />
        <div className="flex relative -top-4 justify-center  items-center gap-1 flex-wrap">
          {tags.map((it)=><div key={`tag-${it}`} className="bg-white rounded-full text-xs text-gray-600 font-medium border -300 px-2 py-1 shadow-lg border-rose-400">{it}</div>)}
        </div>
        <div className="px-4  pb-4">
        <div className=" font-bold">
        {title}
        </div>
        <p className="text-xs mb-2 italic text-gray-500">Created by {authorName} </p>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default RecipeCard

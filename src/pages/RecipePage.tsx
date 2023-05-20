import { useParams } from "react-router-dom"
import Layout from "../components/layout/Layout"

const RecipePage = () => {
  const {recipeId} = useParams()
  
  return (
    <Layout>{recipeId}</Layout>
  )
}
export default RecipePage

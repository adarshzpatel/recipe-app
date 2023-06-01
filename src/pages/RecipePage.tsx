import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import {
  DATABASE_ID,
  RECIPE_COLLECTION_ID,
  database,
} from "../appwrite/client";
import { toast } from "react-hot-toast";
import { getFilePreview } from "../components/libs/utils";
import moment from "moment";
import { Recipe } from "./ExploreRecipesPage";
import Tag from "../components/ui/Tag";

const RecipePage = () => {
  const { recipeId } = useParams();
  const [data, setData] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (recipeId) {
      database
        .getDocument(DATABASE_ID, RECIPE_COLLECTION_ID, recipeId)
        .then((response) => {
          const url = getFilePreview((response as Recipe)?.thumbnail);
          setData({ ...response, thumbnail: url.href } as Recipe);
          console.log(data);
        })
        .catch((err: any) => toast.error(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [recipeId]);

  if (isLoading) {
    return <Layout>Loading...</Layout>;
  }
  return (
    <Layout>
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-3xl font-semibold mb-1">{data?.title}</h1>
        <p className=" text-gray-500 font-light  text-sm mb-2">
          Created by{" "}
          <Link
            to="#"
            className="italic text-rose-500 hover:underline cursor-pointer"
          >
            {" "}
            {data?.authorName}
          </Link>{" "}
          · Last updated on{" "}
          <span className="text-rose-600 italic">
            {" "}
            {moment(data?.$updatedAt).format("Do MMMM YYYY")}{" "}
          </span>
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {data?.tags.map((tag) => (
            <Tag text={tag} />
          ))}
        </div>
        <div className="p-1 border shadow-xl rounded-2xl bg-gray-100/50 border-gray-300">
          <img
            src={data?.thumbnail}
            alt="cover-picture"
            className="aspect-video rounded-xl border border-gray-400 shadow-sm object-cover object-center"
          />
        </div>

        <h6 className="text-2xl mt-8 font-medium">Instructions</h6>
        <p className="text-gray-600 mt-2 whitespace-pre-wrap">{data?.instructions.split('\n').map((text)=><>{text}<br/></>)}</p>
        <h6 className="text-2xl font-medium mt-8 mb-4">Ingredients</h6>
        <ul className="list-inside text-gray-600 ">.
          {data?.ingredients.map((it) => (
            <li className="list-disc">{it}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};
export default RecipePage;

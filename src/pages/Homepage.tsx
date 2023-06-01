import { FiArrowRight } from "react-icons/fi";
import RecipeCard from "../components/explore-recipes/RecipeCard";
import useCurrentUser from "../components/hooks/useCurrentUser";
import Layout from "../components/layout/Layout";

const Homepage = () => {
  const { user } = useCurrentUser();
  const recipeCardData = {
    title: "Chicken Salad",
    instructions:
      "1. Hard boil eggs for 8 minutes, peel and cut in half\n2. Season chicken with beer can chicken and pan fry in olive oil until cooked thoroughly\n3. Combine chopped chicken, chopped lettuce, chopped tomatoes, peeled and chopped cucumbers, finely chopped red onion, finely chopped cilantro, corn, one egg, chopped carrots and half of a diced avocado\n4. Sprinkle with shredded parmesan cheese\n5. Add desired salad dressing\n6. Serve & Enjoy!",
    tags: ["🍗 Chicken", "🥬 Veggies", "🥗  Salad"],
    ingredients: [
      "1 lb Chicken Tenderloins",
      "1 Head Lettuce",
      "1 Pack Cherry Tomatoes",
      "1 Cucumber Cucumber",
      "1 Can Corn",
      "4 Eggs Egg",
      "2 Avocados Avocado",
    ],
    thumbnail:
      "https://cloud.appwrite.io/v1/storage/buckets/6466a9308fcccd326930/files/6473677bdbd85210a95c/preview?project=646305d29ac04526d6db",
    authorId: "64729bdd6aa580c96f28",
    authorName: "Adarsh Patel",
    $id: "6473677ca9db68429232",
    $createdAt: "2023-05-28T14:38:52.696+00:00",
    $updatedAt: "2023-05-28T14:38:52.696+00:00",
    $permissions: [
      'read("any")',
      'update("user:64729bdd6aa580c96f28")',
      'delete("user:64729bdd6aa580c96f28")',
    ],
    $collectionId: "6466a5bac373814fc38f",
    $databaseId: "6466a59081c5386778f5",
  };
  return (
    <Layout>
      {/* hero */}
      <div className="flex gap-4 ">
        <div className="max-w-lg my-20">
          <h1 className="text-5xl  text-rose-500 font-extrabold">
            Exploring Cuisines,
            <br />
            One Recipe at a Time
          </h1>

          <h6 className="text-lg text-gray-500 my-6">
            Browse, create, share,  and  effortlessly bookmark <br/> your culinary
            masterpieces.
          </h6>
          <button className="flex items-center gap-1.5  px-6 py-2 bg-gray-900 hover:bg-rose-500  text-white rounded-full group hover:scale-105 duration-200 ease-out  text-lg ">
            Get Started  <FiArrowRight className="group-hover:translate-x-1 duration-200 ease-out"/>
          </button>
        </div>
        {/* image */}
        <div className="">

        </div>
      </div>
    </Layout>
  );
};

export default Homepage;

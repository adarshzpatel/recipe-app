import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Input from "../components/ui/Input";
import { useState } from "react";
import { DATABASE_ID, USER_COLLECTION_ID, account, database } from "../appwrite/client";
import { AppwriteException, ID } from "appwrite";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate()
  const [error,setError] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);


  const signupWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    try {

      e.preventDefault();
      setError([])
      if (!formData.email || !formData.name || !formData.password) {
        return alert("Please fill all the fields");
      }
      setIsLoading(true);
      const { name, email, password } = formData;
      const user = await account
      .create(ID.unique(), email, password, name);
        
      const promise = await database.createDocument(DATABASE_ID,USER_COLLECTION_ID,user?.$id,{
        accountId:user.$id,
        name:user.name,
        recipes:[],
        saved:[]
      },[])

      toast.success("User successfully registerd")
      navigate("/login")
    } catch(err:any) {
      if(err instanceof AppwriteException){
        setError([...error,err.message])
        toast.error(err.message)
      }
    } finally{
      setIsLoading(false)
    }
  };




  return (
    <Layout className="flex items-center justify-center">
     <div className="sm:bg-rose-100/50 max-w-lg w-full mx-auto overflow-hidden rounded-2xl sm:border border-rose-200 sm:shadow-xl sm:p-1">
      <form
        onSubmit={signupWithEmail}
        className="space-y-4  sm:border  p-12 rounded-2xl border-rose-300 shadow-md bg-white"
        >
        <Heading title="Signup" subtitle="Register your account" />
        <Input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          id="name"
          required
          label="Name"
          type="text"
          placeholder="Enter your name"
          />
        <Input
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          id="email"
          required
          label="Email"
          type="email"
          placeholder="Enter your email"
          />
        <Input
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          id="password"
          required
          label="Password"
          type="password"
          placeholder="Enter your password ( at least 8 characters )"
          className="mb-4"
          />
        <ul className="text-red-500 font-bold list-disc list-inside text-sm">
          {error?.map((err,k)=><li key={k}>{err}</li>)}
        </ul>
        <Button
          text="Signup with email"
          className="w-full"
          loading={isLoading}
          />
        <hr />
        <div className="text-gray-400">
          Already have an account ?{" "}
          <Link
            to="/signup"
            className="text-rose-500 font-bold hover:underline"
            >
            {" "}
            Login{" "}
          </Link>{" "}
        </div>
      </form>
            </div>
    </Layout>
  );
};
export default SignupPage;

import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Button from "../components/ui/Button"
import Heading from "../components/ui/Heading"
import Input from "../components/ui/Input"
import { useState } from "react"
import { account } from "../appwrite/client"
import useCurrentUser from "../components/hooks/useCurrentUser"
import { toast } from "react-hot-toast"

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { getCurrentUser, user, loading } = useCurrentUser()

  const loginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)

    if (!formData.email || !formData.password) {
      return alert("Please fill all the fields")
    }

    const { email, password } = formData

    account
      .createEmailSession(email, password)
      .then((res) => {
        toast.success(`Login Successful`)
        getCurrentUser()
        navigate('/')
      })
      .catch((err) => {
        console.log("error in sign in ", err);
        toast.error("Oops! Something went wrong.")
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!loading && user) {
    toast("You are already logged it!")
     navigate("/recipes")
  }

  return (
    <Layout className="flex items-center justify-center">
      <div className="sm:bg-rose-100/50 max-w-lg w-full mx-auto overflow-hidden rounded-2xl sm:border border-rose-200 sm:shadow-xl sm:p-1">

      <form onSubmit={loginWithEmail} className="space-y-4  sm:border p-12 rounded-2xl bg-white border-rose-300 shadow-md">
        <Heading title="Login" subtitle="Sign in to share & save recipies" />
        <Input onChange={(e) => setFormData({ ...formData, email: e.target.value })} id="email" label="Email" type='email' placeholder="Enter your email" disabled={isLoading} />
        <Input onChange={(e) => setFormData({ ...formData, password: e.target.value })} id="password" label="Password" type='password' placeholder="Enter your password" className="mb-4" disabled={isLoading} />
        <Button text="Login with email" className="w-full" loading={isLoading} />
        <hr />
        <div className="text-gray-400 ">Don't have an account ? <Link to="/signup" className="text-rose-500 font-bold hover:underline"> Sign up </Link> </div>
      </form>
      </div>
    </Layout>
  )
}
export default LoginPage

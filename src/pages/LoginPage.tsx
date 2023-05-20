import { Link, useNavigate, useNavigation } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Button from "../components/ui/Button"
import Heading from "../components/ui/Heading"
import Input from "../components/ui/Input"
import { useState } from "react"
import { account } from "../libs/appwrite"
import useCurrentUser from "../components/hooks/useCurrentUser"

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    email:"",
    password:""
  });
  const [isLoading,setIsLoading] = useState(false);
  const {getCurrentUser} = useCurrentUser()
  const loginWithEmail = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)

    if(!formData.email || !formData.password) {
      return alert("Please fill all the fields")
    }

    const {email,password} = formData

    account
      .createEmailSession(email,password)
      .then(() => {
        getCurrentUser()
        navigate('/')
      })
      .catch((err) => {
        console.log("error in sign in ", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout className="flex items-center justify-center">
      <form onSubmit={loginWithEmail} className="space-y-4 max-w-lg w-full mx-auto sm:border p-12 rounded-2xl">
        <Heading title="Login" subtitle="Sign in to share & save recipies" />
        <Input onChange={(e)=>setFormData({...formData,email:e.target.value})} id="email" label="Email" type='email' placeholder="Enter your email" disabled={isLoading}/>
        <Input onChange={(e)=>setFormData({...formData,password:e.target.value})} id="password" label="Password" type='password' placeholder="Enter your password" className="mb-4" disabled={isLoading}/>
        <Button text="Login with email" className="w-full" loading={isLoading} />
        <hr />
        <div className="text-gray-400 ">Don't have an account ? <Link to="/signup" className="text-rose-500 font-bold hover:underline"> Sign up </Link> </div>
      </form>
    </Layout>
  )
}
export default LoginPage

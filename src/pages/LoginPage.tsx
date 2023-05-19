import { Link } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Button from "../components/ui/Button"
import Heading from "../components/ui/Heading"
import Input from "../components/ui/Input"

const LoginPage = () => {
  return (
    <Layout className="flex items-center justify-center">
      <form className="space-y-4 max-w-lg w-full mx-auto sm:border p-12 rounded-2xl">
        <Heading title="Login" subtitle="Sign in to share & save recipies"/>
        <Input label="Email" type='email' placeholder="Enter your email"/>
        <Input label="Password" type='password' placeholder="Enter your password" className="mb-4"/>
        <Button text="Login with email" className="w-full   "/>
        <hr />
        <div className="text-gray-400 ">Don't have an account ? <Link to="/signup" className="text-rose-500 font-bold hover:underline"> Sign up </Link> </div>
      </form>
    </Layout>
  )
}
export default LoginPage

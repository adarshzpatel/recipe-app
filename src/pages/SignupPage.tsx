import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Input from "../components/ui/Input";
import { useState } from "react";
import { account } from "../libs/appwrite";
import { ID } from "appwrite";

const SignupPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const signupWithEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.password) {
      return alert("Please fill all the fields");
    }
    setIsLoading(true);
    const { name, email, password } = formData;
    account
      .create(ID.unique(), email, password, name)
      .then((res) => {
        navigate('/login');
      })
      .catch((err) => {
        // failed
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };  


  
  return (
    <Layout className="flex items-center justify-center">
      <form
        onSubmit={signupWithEmail}
        className="space-y-4 max-w-lg w-full mx-auto sm:border p-12 rounded-2xl"
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
    </Layout>
  );
};
export default SignupPage;

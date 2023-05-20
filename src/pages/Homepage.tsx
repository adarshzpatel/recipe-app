import useCurrentUser from "../components/hooks/useCurrentUser"
import Layout from "../components/layout/Layout"


const Homepage = () => {
  const {user} = useCurrentUser()
  return (
    <Layout>  
      This will be the homepage
    </Layout>
  )
}

export default Homepage

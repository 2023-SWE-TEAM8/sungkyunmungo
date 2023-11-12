import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import MyProfile from '@/components/accounts/profile'

const Profile = () => {
  const router = useRouter()

  return (
    <Layout>
      <MyProfile></MyProfile>
    </Layout>
  )
}

export default Profile

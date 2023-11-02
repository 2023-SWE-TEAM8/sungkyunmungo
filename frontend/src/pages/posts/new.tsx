import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import PostNewForm from '@/components/posts/postNewForm'

const PostNew = () => {
  const router = useRouter()

  return (
    <Layout>
      <PostNewForm />
    </Layout>
  )
}

export default PostNew

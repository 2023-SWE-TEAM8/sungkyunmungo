import { useRouter } from 'next/router'

const Profile = () => {
  const router = useRouter()

  return (
    <>
      <div>profile</div>
      <div>id num : {router.query.id}</div>
    </>
  )
}

export default Profile

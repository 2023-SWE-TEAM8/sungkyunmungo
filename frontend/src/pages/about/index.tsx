import Layout from 'src/components/layout/layout'

const about = () => {
  return (
    <>
      <div>This is About Page</div>
      <div>About Page Description</div>
      <Layout color />
      <Layout color={false} />
    </>
  )
}

export default about

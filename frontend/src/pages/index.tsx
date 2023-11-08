import Layout from '@/components/layout/layout'
import ThumbnailBox from '@/components/home/thumbnailBox'
import HomeFilter from '@/components/home/homeFilter'

const Home = () => {
  return (
    <Layout homeNum>
      <HomeFilter />
      <ThumbnailBox te="1" num="5" title="오늘 올라온 책" />
      <ThumbnailBox te="2" num="5" title="전공 즐겨찾기" />
      <ThumbnailBox te="3" num="10" title="거래 중인 모든 서적보기" />
    </Layout>
  )
}

export default Home

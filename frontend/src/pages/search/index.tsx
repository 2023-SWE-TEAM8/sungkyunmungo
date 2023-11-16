import { useRouter } from 'next/router'

import Layout from '@/components/layout/layout'
import ThumbnailBox from '@/components/home/thumbnailBox'
import HomeFilter from '@/components/home/homeFilter'

const Search = () => {
  const router = useRouter()
  const inputData = router.query.input
  const inputCampus = router.query.campus
  const { major } = router.query

  return (
    <Layout homeNum>
      <HomeFilter />
      <ThumbnailBox te="4" num="20" title="검색결과" />
      <div>
        {inputData} {inputCampus} {major}
      </div>
    </Layout>
  )
}

export default Search

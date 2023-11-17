import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import DetailedPost from '@/components/post/detailPost'
import ImagesCarousel from '@/components/post/imagesCarousel'

const InPost = () => {
  const dummyData = {
    success: true,
    data: [
      {
        _id: '65557f0f042837f0b6d3f04a',
        writer: 'skmgtest2',
        title: '테스트 제목입니다.',
        price: 1000,
        description:
          '책에 젖었던 흔적이 남아있지만 사용하기에 문제 없습니다.\n\n필기감 전혀없고\n연습문제에만 체크 몇개 된게 다입니다.\n\n\n논리회로 교재이고 자연과학캠퍼스 직거래 희망해요.',
        imageUrl: [
          'https://picsum.photos/id/7/4728/3168',
          'https://picsum.photos/id/6/5000/3333',
          'https://picsum.photos/id/5/5000/3334',
        ],
        condition: '상',
        campus: 'NSC',
        major: 'software',
        status: '판매중',
        createdDt: '2023-11-15T02:31:43.516Z',
        __v: 0,
      },
    ],
  }

  const curUserDummy = 'skmgtest'

  const router = useRouter()
  const userID = router.query.id
  return (
    <Layout>
      <ImagesCarousel imageUrl={dummyData.data[0].imageUrl} />
      <DetailedPost curUser={curUserDummy} descData={dummyData.data[0]} />
    </Layout>
  )
}

export default InPost

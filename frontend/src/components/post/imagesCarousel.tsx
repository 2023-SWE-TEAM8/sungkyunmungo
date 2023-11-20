import { useState } from 'react'
import { useRouter } from 'next/router'

import { Carousel } from 'react-responsive-3d-carousel'

import * as IC from './imagesCarousel.styled'

const ImageCar = ({ imageUrl }) => {
  const onErrorImg = (e) => {
    e.target.src = '/assets/noImg.jpg'
  }
  return (
    <IC.TopBox>
      <IC.CarBox>
        <Carousel
          spread="narrow"
          arrowsDefaultColor="rgb(0,0,0)"
          arrowsStrokeWidth="6"
          showIndicators
          depth="2"
          interval={7000}
          indicatorsActiveColor="rgb(0,0,0)"
        >
          {imageUrl.map((el) => {
            return <img src={el} alt="example-image-1" onError={onErrorImg} />
          })}
        </Carousel>
      </IC.CarBox>
    </IC.TopBox>
  )
}

export default ImageCar

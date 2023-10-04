import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styled from 'styled-components'

const StyleSlide = styled(SwiperSlide)`
position: relative;
img{width: 100%; height:auto;}
`
const DescContent = styled.div`
  position: absolute;
  left: 50%;
  top:50%;
  color:#fff;
  transition: translate(-50%, -50%);
  h3{
    text-align: center; 
    font-size: 16px;
    @media screen and (max-width:768px) {
      font-size: 16px;      
    }
    @media screen and (min-width:1280px){
      font-size: 30px;
    }
  }
  p{
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    @media screen and (max-width:768px) {
      font-size: 14px;
    }
    @media screen and (max-width:1280px){
      font-size: 20px;
    }
  }
`


const imgs = ["6709.jpg","235423.jpg","wp3165470.webp","wp8312526.webp","img1.jpg"]


function Banner() {
  return (
    <Swiper
     autoplay={{
      delay:1000,
      disableOnInteraction:false
     }}
     modules={[Autoplay,Navigation,Pagination]} 
     loop={true}
     slidesPerView={1} pagination={{clickable: true}}
     navigation={{clickable:true}}
    >
      {
        imgs.map((e,i)=>{
          return(
          <StyleSlide key={i}>
          <img src={`./images/${e}`} alt='slide'/>
          <DescContent>
            <h3>강조하는 제목 {i}</h3>
          </DescContent>
          </StyleSlide>
          )
        })
      }

  </Swiper>
  )
}

export default Banner
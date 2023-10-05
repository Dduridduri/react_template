import React, { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styled from 'styled-components'
import WOW from 'wowjs'
import 'animate.css'

const TxtData =[
  {
    title: "제목1",
    desc: "부제목",
    desc2: "하고싶은 말...",
    img: "6709.jpg"
  },
  {
    title: "제목2",
    desc: "부제목",
    desc2: "하고싶은 말...",
    img: "235423.jpg"  
  },
  {
    title: "제목3",
    desc: "부제목",
    desc2: "하고싶은 말...",
    img: "wp3165470.webp"   
  },
  {
    title: "제목4",
    desc: "부제목",
    desc2: "하고싶은 말...",
    img: "wp8312526.webp"

  },
  {
    title: "제목5",
    desc: "부제목",
    desc2: "하고싶은 말...",
    img: "img1.jpg"    
  },
]

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

  useEffect(()=>{
    new WOW.WOW({
      boxClass: "wow",
      animateClass:"animate__animated",
      live:false,
      mobile:true
    }).init();
  },[])

  return (
    <Swiper
     autoplay={{
      delay:1000,
      disableOnInteraction:false
     }}
     modules={[Autoplay,Navigation,Pagination]} 
     loop={true}
     slidesPerView={1}
     pagination={{clickable: true}}
     navigation={{clickable:true}}
    //  onSwiper={(swiper)=>{console.log(swiper)}}
    onSlideChange={()=>{new WOW.WOW({
      live:false
    }).init()
  }}
    >
      {
        TxtData.map((e,i)=>{
          return(
          <StyleSlide key={i}>
          <img src={`./images/${e.img}`} alt='slide'/>
          <DescContent>
            <h3 className='wow animate__rubberBand' data-wow-duration="1s">{e.title}</h3>
            <p className='wow animate__rubberBand' data-wow-duration="1s" data-wow-delay="0.3s">{e.desc}</p>
            <p className='wow animate__rubberBand' data-wow-duration="1s" data-wow-delay="0.6s">{e.desc2}</p>
          </DescContent>
          </StyleSlide>
          )
        })
      }

  </Swiper>
  )
}

export default Banner
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '../store'
import Product from './Product'
import { useMemo } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Autoplay, Pagination} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Banner from "../components/home/Banner"
import Company from '../components/home/Company'
import Content from '../components/home/Content'
import Different from '../components/home/Different'
import Management from '../components/home/Management'

// const Test = ()=>{
//     return(
//       console.log("계속 실행됨")
//     )   
  
// }

function Main() {
  
  // const result = useMemo(()=>{
  //   return Test()
  // },[])
  // //재랜더링 반복되는거 방지

  // useEffect(()=>{
  //   console.log("완료!")
    
  //   return ()=>{
  //     console.log("완료가 되기전 실행됨")
  //     //컴포넌트가 벗어날때 먼저 실행됨
  //   }
  // },[])

  
  let [count,setCount] = useState(0)

  return (
    <>       
      <Banner/>
      <Company />
      <Content />
      <Different/>
      <Management/>
    </>
  )
}

export default Main
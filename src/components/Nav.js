import { faArrowRightFromBracket, faLock, faUser, faChevronDown, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'




const NavContent = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  background-color: #fff;
  z-index: 40;
  
`
const NavWrap = styled.div`
  max-width: 1280px;
  margin: 0 auto; display: flex; justify-content: space-between;
  align-items: center; padding: 10px 2%;
`
const NavLogo = styled.div`
  img{width: 100%;}
`
const NavList = styled.div`
  display: flex; justify-content: space-between; flex-basis: 66.66667%;
  @media screen and (max-width: 1024px){
    display: none;
  }
  ul{
    display: flex; flex-basis: 100%; justify-content: space-between;
    li{
      position: relative; flex-basis: 25%; text-align: center;
      a.active{
        font-weight: bold;

      }
    }
  }
`
const StyledIcon = styled(FontAwesomeIcon)`
  transition: all 0.5s;
  font-size: 12px;
  vertical-align: baseline;
  transform: scale(${({$isopen}) => $isopen === "true" ? "-1" : "1"});
`
const NavSubmenu = styled.ul`
  position: absolute;
  background-color: rgb(30,41,59);
  transition: 0.5s;
  flex-wrap: wrap;
  text-align: center;
  height: ${({$isopen, $height}) => ($isopen === "true" ? $height : "0px")};
  overflow: hidden;
  li{
    flex-basis: 100% !important;
    padding: 10px 0; 
    a{
      color: #fff;
    }
  }
  
`
const NavMember = styled.div`
  ul{
    display: flex; column-gap: 20px;
    li{
      a.active{
        font-weight: bold;
      }
    }
  }
`
const Hamburger = styled.div`
  position: fixed;
  right: 16px;
  top: 24px;
  transition: all 1s;
  z-index: 50;
  cursor: pointer;
  > div{ width: 30px ;
    height: 2px; background-color: #000; border-radius: 4px; margin: 6px; transition: all 1s;
  }
  &.on div:nth-child(1){transform: rotate(45deg) translateY(12px)}
  &.on div:nth-child(2){opacity: 0; transform: translateX(-30px) rotate(720deg);}
  &.on div:nth-child(3){transform: rotate(-405deg) translateY(-12px)}
  @media screen and (min-width: 1024px){
    display: none;
  }
  @media screen and (max-width: 728px){
    right: 24px;
  }
`
const Container = styled.div`
width: 320px;
height: 100%;
position: fixed;
background-color: #f9fafb;
right: ${({$isopen}) => $isopen ? "0px" : "-320px"};
top: 0;
padding: 48px;
box-sizing: border-box;
z-index: 40;
transition: all 0.5s;

&.on{
  right: 0;
}

@media screen and (min-width: 1024px){display: none;}
>ul{
  margin-top: 24px;
  >li{
    padding: 20px; border-bottom: 1px solid #ddd;
    font-weight: bold;
    cursor: pointer;
  }
}
`
const Msubmenu = styled(NavSubmenu)`
width: 100%;
position: relative;
background-color: transparent;
text-align: left;

li{
  padding-left: 15px;
  a{
    color: #000;
  }
}
`
const MsubmenuMember = styled(NavMember)`
 margin-top: 45px;
 ul{
  justify-content: center;
  li{
    border: 1px solid #ddd;
    padding: 10px; border-radius: 4px;
    background-color: #8e8e8e;
    &:nth-child(2){
      background-color: green;
    }
    a{color: #fff;}
  }
 }
`


function Nav() {
  const userState = useSelector(state => state.user);
  const [isHeight, setIsHeight] = useState();
  const SubMenuHeight = (e)=>{
    const list = document.querySelectorAll(".sub_list")[e];
    const listLength = list.querySelectorAll("li").length;
    const value = listLength * 43+"px";

    return setIsHeight(value);

  }

  const [isActive, setIsActive] = useState(-1);
  const [isActive2, setIsActive2] = useState(false);
  const SubData = {
    company: [
      {
        title:"인사말",
        link: "/company/greetings"
      },
      {
        title:"연혁",
        link: "/company/history"
      },
      {
        title:"내부전경",
        link: "/company/interior"
      },
      {
        title:"오시는길",
        link: "/company/directions"
      },
    ],
    business: [
      {
        title:"사업소개",
        link:"/business/business-1"
      },
      {
        title:"사업소개2",
      link:"/business/business-2"
      },
      {
        title:"사업소개3",
        link:"/business/business-3"
      }
    ],
    product: [
     {
      title:"제품소개",
      link:"/product/product-1"
     },
     {
      title:"제품소개2",
      link:"/product/product-2"
     },
     {
      title:"제품소개3",
      link:"/product/product-3"
     }
    ],
    service: [
      {
        title:"공지사항",
        link:"/service/notice"
       },
      {
        title:"온라인 상담",
        link:"/service/online"
       },
      {
        title:"질문과답변",
        link:"/service/qna"
       },
      {
        title:"갤러리",
        link:"/service/gallery"
       }
    
    ]
  }
  //변수명['company'][0].title
  // const SubMenu = [
  //   ["인사말", "연혁", "내부전경", "오시는길"],
  //   ["사업소개", "사업소개2", "사업소개3"],
  //   ["제품소개", "제품소개2", "제품소개3"],
  //   ["공지사항", "온라인 상담", "질문과답변", "갤러리"]
  // ]
  // const SubmMenuLink = [
  //   ["/company/greetings", "/company/history", "/company/interior", "/company/directions"],
  //   ["/business/business-1","/business/business-2","/business/business-3"],
  //   ["/product/product-1","/product/product-2","/product/product-3"],
  //   ["/service/notice", "/service/online", "/service/qna", "/service/gallery"]
  // ]



  //  const Nav = [
  //   ["회사소개", "사업소개", "제품소개", "고객센터"],
  //   ["/company", "/business", "/product", "/service"]
  //  ]
   const Nav = [
    {
      title: "회사소개",
      link : "company"
    },
    {
      title: "사업소개",
      link : "business"
    },
    {
      title: "제품소개",
      link : "product"
    },
    {
      title: "고객센터",
      link : "service"
    }
   ]
  //  SubMenu[i].map((e,index)=>{
  //   return( 
  //     console.log(e,index)
  //   )
  // })

  return (
    <>
      <NavContent>
        <NavWrap>
          <NavLogo>
            <NavLink to="/">
              <img src="https://via.placeholder.com/120x60" alt="로고" />
            </NavLink>
          </NavLogo>
          <NavList>
            <ul>
              {
                // Nav[0].map((e,i)=>{
                //   return (
                //     <li><NavLink to={Nav[1][i]}>{e}</NavLink></li>
                //   )
                // })
                Nav.map((e,i)=>{
                  return (
                    <li onMouseOver={()=>{
                      setIsActive(i);
                      SubMenuHeight(i)
                    }} onMouseOut={()=>{
                      setIsActive(-1);
                    }} 
                    key={i}><NavLink to={`/${e.link}`}>{e.title}</NavLink>
                    <StyledIcon icon={faChevronDown} $isopen={isActive === i ? "true" : "false"}/>
                      <NavSubmenu className={`sub_list`} $isopen={isActive === i ? "true" : "false"} $height={isHeight}>
                        {
                          SubData[e.link].map((el,index)=>{
                            return (
                              <li key={index}><NavLink to={el.link}>{el.title}</NavLink></li>
                            )
                          })
                        }
                      </NavSubmenu>
                    </li>
                  )
                })
              }
            </ul>
          </NavList>
          <NavMember>
            <ul>
              <li>
                <NavLink to={userState.uid ? "/logout" : "/login"}>
                  <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> {userState.uid ? "로그아웃" : "로그인"}
                </NavLink>
              </li>
            {
              userState.uid ? 
              <li>
              <NavLink to="/modify">
                <FontAwesomeIcon icon={faUserPen}></FontAwesomeIcon> 정보수정
              </NavLink>
            </li>
              :
              <li>
              <NavLink to="/member">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> 회원가입
              </NavLink>
            </li>
            }
            </ul>
          </NavMember>
        </NavWrap>
      </NavContent>
      <Hamburger onClick={()=>setIsActive2(!isActive2)} className={isActive2 && 'on'}>
      {
        Array(3).fill().map((_,i)=>{
          return(
            <div key={i} ></div>
          )
        })
      }
    </Hamburger>
      <Container $isopen={isActive2}>

        <MsubmenuMember>
          <ul>
              <li>
                  <NavLink to="/login">
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> 로그인
                  </NavLink>
              </li>
              <li>
                  <NavLink to="/member">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> 회원가입
                  </NavLink>
              </li>
          </ul>
        </MsubmenuMember>
        
          <ul>
            {
                 Nav.map((e,i)=>{
                  return(
                    <li key={i} onClick={
                      ()=>{
                        SubMenuHeight(i);
                        (isActive !== i ? setIsActive(i) : setIsActive(-1));

                    }}>{e.title}
                        <Msubmenu className='sub_list' $isopen={isActive === i ? "true" : "false"} $height={isHeight}>
                          {
                            SubData[e.link].map((el,index)=>{
                              return(
                                <li key={index}><NavLink to={el.link}>{el.title}</NavLink></li>
                              )
                            })
                          }


                        </Msubmenu>
                      </li>
                  )
                })
            }
          </ul>       
        
      </Container>
    </>
  )
}

export default Nav
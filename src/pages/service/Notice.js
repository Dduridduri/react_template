import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import View from '../View'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const BoaderWrapper = styled.div`
  max-width:1000px;
  margin: 50px auto;
`
const Title = styled.div`
  padding: 10px 20px; font-weight: bold; font-size: 24px;
`

const List = styled.ul`
  display: flex; 
  border-bottom: 1px solid #e0e0e0;

`
const ListItem = styled.li`
  padding: 10px 20px; text-align: center;
  flex-basis: 10%;
  &:nth-child(2){flex-basis:50%;}
  &:nth-child(3){flex-basis:10%;}
  &:nth-child(4){flex-basis:20%;}
`
const ButtonWarp = styled.div`
    display: flex;
    justify-content: flex-end;
`
const Button = styled.button`
    border-radius: 0%.5rem;
    margin: 20px 0px;
    background-color: rgb(126,34,206);
    padding: 0.625rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: bold;
    color: #fff;
    display: flex; align-items: center;
    outline: none;
    border: none;
    cursor: pointer;
    &:nth-child(1){
        background-color: rgb(29,78,216);
    }
    a{color: #fff;}
    svg{margin-right:12px}
`
function Notice() {

  const [posts, setPosts] = useState([]);
  useEffect(()=>{

    const fetchPosts = async () => {
      try{

        const q = query(collection(getFirestore(),'notice'), orderBy("timestamp", 'desc'));
        //desc - 내림차순 / asc 오름차순
        const snapShot = await getDocs(q);
        console.log(snapShot);
        const postArray = snapShot.docs.map(doc =>({id: doc.id, ...doc.data()}));
        //id에는 id값추가해주고 나머지 data 데이터 더넣을려고
        setPosts(postArray);
        console.log(posts);
        
      }catch(error){
        console.log(error)
      }
    }
    fetchPosts();
  },[])
  console.log(posts)

  if(posts.length === 0){
    return <div>로딩중</div>;
  }

  const increaseView = (id) => {
    setPosts(prevPosts => 
        prevPosts.map(post => 
            post.id === id ? { ...post, view: post.view + 1 } : post
        )
    );
};


  return (
    <>
    <BoaderWrapper>
      <Title>공지사항</Title>
      <List>
        <ListItem>번호</ListItem>
        <ListItem>제목</ListItem>
        <ListItem>작성자</ListItem>
        <ListItem>작성일</ListItem>
        <ListItem>조회수</ListItem>
      </List>
      {
        posts.map((e,i)=>{
          return(

          <List key={i}>
          <ListItem>{posts.length - i}</ListItem>
          <ListItem><Link to={`/view/notice/${e.id}`} onClick={()=>increaseView(e.id)}>{e.title}</Link></ListItem>
          <ListItem>{e.nickname}</ListItem>
          <ListItem>{e.timestamp.toDate().toLocaleDateString()}</ListItem>
          <ListItem>{e.view}</ListItem>
          </List>      

          )
          
        })
      }
      <ButtonWarp>
        <Button><Link to="/write/notice"><FontAwesomeIcon icon={faPen}/>글쓰기</Link></Button>
      </ButtonWarp>
    </BoaderWrapper>
    </>
  )
}

export default Notice
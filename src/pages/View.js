import React from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Modal from '../components/Modal';
import { useEffect } from 'react';
import { Firestore, doc, getDoc, getFirestore } from 'firebase/firestore';

function View() {
  
  const {board, view} = useParams();
  const boards = ["notice", "online", "qna","gallery"];
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [message, setMessage] = useState("");

  useEffect(()=>{    
      const fetchData = async () =>{
        const postRef = doc(getFirestore(),board,view);
        const postSnapShot = await getDoc(postRef);
        if(postSnapShot.exists()){
          setPost(postSnapShot.data())
        }else{
          setIsModal(true)
          setMessage("해당 문서가 존재하지 않습니다.")

        }
        console.log(postSnapShot.data())
      }
      fetchData()    
  },[board,view])
  
  if(!boards.includes(board)){
    return(
      <>
      {
        isModal &&
        <Modal error='잘못된 게시글입니다!' onClose={()=>{setIsModal(false);navigate('/')}}/>
      }
      </>
    )
  }
  
  if(isModal){
    return(
      <>
      {
        isModal && <Modal error={message} onClose={()=>{setIsModal(false);}}/>
      }
      <div>로딩중</div>
      </>
    )
  }

  if(!post){
    return(        
      <div>로딩중</div>
    )
  }


  return (
    <>
    {
      isModal && <Modal error={message} onClose={()=>{setIsModal(false);}}/>
    }
    <div>{post.title}</div>
    <div>{post.nickname}</div>
    <div>{post.timestamp.toDate().toLocalDateString}</div>
    <div>{post.view}</div>
    <div dangerouslySetInnerHTML={{__html: post.content}}/>

    <Link to="/service/notice">목록</Link>
    <Link to="/write/notice">글쓰기</Link>
    </>
  )
}

export default View
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';



function Modify() {
  const userState = useSelector(state => state.user);
  console.log(userState)
  const navigate = useNavigate();


  return (
    <>
    {
    !userState.loggedIn ? <Modal error="로그인상태가 아닙니다." onClose={()=>{navigate('/login')}}/> :

    <div>Modify</div>
    }
    </>
  )
}

export default Modify
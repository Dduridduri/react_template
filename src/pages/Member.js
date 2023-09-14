import React, { useState } from 'react'
import styled from 'styled-components'
import { firebaseAuth , createUserWithEmailAndPassword} from '../firebase'
import {doc, setDoc, getFirestore} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
display: flex;
background-color: #f5f5f5;
justify-content: center;
height: calc(100vh - 86px);
align-items: center;
`
const SignUp = styled.div`
width: 35vw;
padding: 20px;
box-shadow: 0 0 10px rgba(0,0,0,0.1);
background-color: #fff;
border-radius: 10px;
@media screen and (max-width: 1024px){
  width: 60vw;  
}
@media screen and (max-width: 640px){
  width: 70vw;  
}
`
const Title = styled.h1`
  font-size: 24px;
  text-align: center; margin-bottom: 20px;
`
const Input = styled.input`
  width: 100%; padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px; box-sizing: border-box;
`
const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  border:none;
  color: #fff;
  cursor: pointer;

`

function Member() {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [nickname,setNickname] = useState();
  const [phone,setPhone] = useState();
  const [error,setError] = useState();
  const navigate = useNavigate();

  const errorMsg = (errorCode) =>{
    const firebaseError ={
      'auth/admin-restricted-operation' : "빈 데이터가 있다.",
      'auth/email-already-in-use' : "이미 사용중인 이메일 주소",
      'auth/invalid-email' : "유효하지 않은 이메일 주소",
      'auth/operation-not-allowed' : "이메일/비밀번호 계정이 비활성화 되어있습니다.",
      'auth/weak-password' : "너무 짧은 비밀번호를 사용하였습니다.(6자리)",
      'invalid-argument' : "회원정보 입력"
    }
    return firebaseError[errorCode] || '알 수 없는 에러가 발생하였습니다.'
  }

  const PhoneNumber = (e) =>{
    const value = e.target.value;
    const number = (''+value).replace(/[^0-9]/g, '')
    const match = number.match(/^(\d{2,3})(\d{3,4})(\d{4})$/)

    if(match){
        return setPhone(match[1] + '-' + match[2] + '-' + match[3])      
    }
   
  }
  

  const signUp = async (e) =>{
    e.preventDefault();

    try{
      const {user} = await createUserWithEmailAndPassword
      (firebaseAuth, email, password)

      const userProfile = {
        name, 
        nickname,
        phone
      }

      console.log(userProfile)

      await setDoc(doc(getFirestore(), "users", user.uid), userProfile)
      
      alert("회원가입이 완료되었습니다.")
      navigate('/');

    }catch(error){
      setError(errorMsg(error.code));
      console.log(error.code);
    }
  }


  return (
    <>
    <Container>
      <SignUp>
        <Title>회원가입</Title>
        {phone}
        <Input defaultValue={name} onChange={(e)=>{setName(e.target.value)}} type='text' className='name' placeholder='이름'/>
        <Input defaultValue={nickname} onChange={(e)=>{setNickname(e.target.value)}} type='text' className='nickname' placeholder='닉네임'/>
        <Input defaultValue={phone} onChange={PhoneNumber} maxLength={13} type='text' className='phone' placeholder='전화번호'/>
        <Input type='email' className='email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='이메일'/>
        <Input type='password' className='password' onChange={(e)=>{setPassword(e.target.value)}} placeholder='비밀번호'/>
        <Input type='password' className='confirm_password' placeholder='비밀번호 확인'/>
        <Button onClick={signUp}>가입</Button>
        <p>{error}</p>
      </SignUp>
    </Container>
    
    
    </>
  )
}

export default Member
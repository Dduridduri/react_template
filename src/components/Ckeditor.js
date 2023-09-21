import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
//Link navLink는 액티브 되냐아니냐
import { faList, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './Modal';

const ButtonWarp = styled.div`
    display: flex;
    justify-content: space-between;
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

function Ckeditor({title, postData}) {
    const memberProfile = useSelector(state => state.user);
    const [isModal, setIsModal] = useState(false);
    const navigate = useNavigate();
    const {board, view} = useParams();
    const [writeData, setWriteData] = useState("");
    const [message, setMessage] = useState("");


    useEffect(()=>{
        if(postData){
            setWriteData(postData.content);
        }
    },[postData])
    
    
    const dataSubmit = async ()=>{
      if(title.length === 0){
        setIsModal(!isModal);
        setMessage("제목을 입력해주세요");
        return;
      }else if(writeData.length === 0){
        setIsModal(!isModal);
        setMessage("내용을 입력해주세요");
        return;
      }



    try{
        if(board && view){
            const postRef = doc(getFirestore(),board, view);
            await updateDoc(postRef,{
                title: title,
                content: writeData
            })

            
            alert("게시글이 성공적으로 등록되었습니다.")
        }else{
            await addDoc(collection(getFirestore(),board),{
                //setDoc은 지정 user만들어감 addDoc은 랜덤user로 추가됨
                title: title,
                content: writeData,
                view: 1,
                uid: memberProfile.uid,
                name: memberProfile.data.name,
                email: memberProfile.data.email,
                nickname: memberProfile.data.nickname,
                timestamp: serverTimestamp()
            })
            alert("게시글이 성공적으로 등록되었습니다.")
        }

        navigate(`/service/${board}`)
        //어느게시판이던 지금 게시판으로 들어감
    }catch(error){
        setIsModal(!isModal);
        setMessage(error);
    }
    }

    console.log(memberProfile)



  return (
    <>
    {isModal&& <Modal error={message} onClose={()=>{setIsModal(false)}} />}    
    <CKEditor
                  
                     editor={ClassicEditor}
                     data = {writeData}
                    config={{
                         placeholder: "내용을 입력하세요.",
                     }}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setWriteData(data);
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                <ButtonWarp>
                    <Button><Link to="/service/notice"><FontAwesomeIcon icon={faList}/>목록</Link></Button>
                    <Button onClick={dataSubmit}><FontAwesomeIcon icon={faPen}/>완료</Button>

                </ButtonWarp>
    
    </>
  )
}

export default Ckeditor
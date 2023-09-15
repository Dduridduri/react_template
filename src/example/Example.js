import React, { useEffect, useState } from 'react'

function Example() {

  //promise - 어떤값을 반환하거나 오류를 던질거라는 약속
  //async/await - 약속의 결과를 기다릴떄 사용하는 문법
  //성공을 실패로 돌리거나 대기로 돌릴수없다.
  //Promis - 3가지 상태가 존재한다.

  //pending - 대기 / resolved - 성공 / rejected - 실패

  let data = new Promise(function(resolved,rejected){
    let value = [
      {
        name:"홍길동",
        age: "1"
      }
    ];
    if((1 + 1) === 2){
      resolved(value[0])
    }else{
      rejected(value)
    }
  });
  console.log(data)
  
  data.then(function(res){    
    console.log("성공함" + res.name)
  }).catch(function(){
    console.log("오류가 뜸")
  })
  let data2 = new Promise(function(resolved,rejected){
   setTimeout(function(){
    resolved();
   },1000)

  });
  console.log(data)
  
  data2.then(function(){    
    // console.log("성공")
  }).catch(function(){
    console.log("오류가 뜸")
  })
  //이미지가 로딩이 성공되었다면 > 성공판정
  //이미지가 로딩이 실패되었다면 > 실패판정
  //로딩 실패시 > 에러가 발생 > error
  
  useEffect(()=>{
    
    let imgLoading = new Promise(function(resolved,rejected){  
      resolved()
    })

    imgLoading.then(function(){
      // alert("성공")
    }).catch(function(){
      // alert("실패")
    })
  },[])
//asynce - 함수에만 붙을 수 있다. + funtion 앞에 사용
//await - async 내에서만 사용 가능/ 단독으로 불가능 - promise가 실행완료 전까지 실행x
//async 사용시 promise 오브젝트가 자동 반환
//async - promis - then 사용가능 > 실무작업에서는 try/catch 문을 주로사용
//fetch - 함수 사용시 Promise를 반환 > then / catch 사용가능.

//then - 성공시 실행
//catch - 실패시 실행
//fianlly - 마지막 완료시 실행 (성공or실패)

//try - 오류 발생가능성있는 코드 작성
//catch - 만약 try문에서 실패가 있다면 함수 실행
//fianlly - 마지막 완료시 실행 (성공or실패)
const [isList, setIsList] = useState()
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
    .then(res => res.json())
    .then(data => setIsList(data))
    .catch(error => console.log(error))
    .finally(()=>{console.log("데이터 요청 완료")})
  },[])

  async function fetchData2(){

  }


  const FetchData = async ()=>{
    try{
      let res = await fetch ("https://jsonplaceholder.typicode.com/photos?albumId=1")
      let data = await res.json();
      console.log(data)
    }catch(error){
      console.log(error)
    }finally{
      console.log("데이터 요청끝")
    }
  }
  FetchData()

  return (
    <div>
      {
        isList && isList.map((e,i)=>{
          return(
            <img key={i} src={e.url} alt={e.title}/>
          )
        })
        }
    </div>
  )
}

export default Example
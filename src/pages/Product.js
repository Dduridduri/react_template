import React ,{ memo } from 'react'



//재랜더링 계속 할필요없을때 이렇게 씀
const Product = memo(function() {
  
  console.log("product 실행")
  return (
    <div>Product</div>
  )

})




export default Product
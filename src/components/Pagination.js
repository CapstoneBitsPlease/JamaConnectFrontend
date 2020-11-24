import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
  const pageNumbers =[];
  for(let i =1; i<= Math.ceil(totalPosts/postsPerPage); i++){
    pageNumbers.push(i);
  }
  console.log("post per page",postsPerPage);
  console.log("total posts",totalPosts);
  return (
    <div>
      {pageNumbers.map(number=>(
        <p key ={number}>
          <button onClick={()=>paginate(number)} >
            {number}
          </button>
        </p>
      ))}
    </div>
  )
}
export default Pagination;
import React from 'react'

const Posts = ({posts, loading}) => {
  if(loading){
    return <h2>Loading...</h2>
  }
  return (
    <div className = "posts-container">
      {posts.map((data,index) =>(
        <div key={index} className="syncerror-info">
        <p>Asctime: {data.asctime}</p>
        <p>Levelname: {data.levelname}</p>
        <p>Message: {data.message}</p>
        <p>Name: {data.name}</p>
      </div>
      ))}
    </div>
  )
}
 export default Posts;
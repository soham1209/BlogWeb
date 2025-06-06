import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router'

function PostCard({ post }) {

  return (
    <Link to={`/post/${post.$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>

          {post.FEATUREDIMAGE && (
            
            <img src={appwriteService.getFilePreview(post.FEATUREDIMAGE)} alt={`${post.TITLE} img`}
              className='rounded-xl' />
          )}
        </div>
        <h2
          className='text-xl font-bold'
        >{post.TITLE}</h2>
      </div>
    </Link>
  )
}


export default PostCard
import React from 'react'
import service from '../services/config'
import {Link} from 'react-router-dom'

function PostCard({
    $id,
    title,
    featuredImage
}) {
    return (
        // On Clicking anywhere in the postCard will direct to the detail preview of the post 
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={service.getFilePreview(featuredImage)} alt="" />
                </div>
                <h2
                className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>

    )
}

export default PostCard
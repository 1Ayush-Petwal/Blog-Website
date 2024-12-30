import React from 'react'
import {Container, PostForm} from '../components/index'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../services/config'
function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams() // slug is the unique identifier of the post (url) is brought from the useParams hook in the react-router-dom

    const navigate = useNavigate()
    useEffect(()=> {
        if(slug){
            service.getPost(slug)
            .then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }
    } , [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
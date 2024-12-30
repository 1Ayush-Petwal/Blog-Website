import React, { useState, useEffect }from 'react'
import { Container, PostCard } from '../components/index'
import service from '../services/config'
function AllPosts() {
    // We have to import all the posts from the database
    const [posts, setPosts] = useState([])
    service.getPosts([])
    .then((posts) => {
        // If error then null returns
        if(posts){
            setPosts(posts.documents)
        }
    })
    .catch()

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
import React, { useState, useEffect } from 'react'
import service from '../services/config'
import { PostCard, Container } from '../components/index'
import { useNavigate } from 'react-router-dom'
function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        service.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
    }, [navigate])

    if (posts.length === 0) {
        return <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard
                                // $id={post.$id}
                                // title={post.title}
                                // featuredImage={post.featuredImage}
                                {...post}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
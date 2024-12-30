import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../services/config';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button } from '../components/index';
import parse from 'html-react-parser';

function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    // Why $id ?
    // Whenever we use a Baas such as appwrite giving the id with a $ sign is a good practice
    const isAuthor = post && userData ? userData.$id === post.userId : false;

    // Such that when we delete the post the file attached within is also deleted in the process 
    const deletePost = () => {
        service.deletePost(slug)
            .then((status) => {
                if (status) {
                    service.deleteFile(post.featuredImage);
                }
                navigate('/');
            })
    }

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((post) => {
                    if (post) setPost(post)
                    else navigate('/')
                })
        } else {
            navigate('/');
        }
    }, [slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl" />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button className='' onClick={() => deletePost()}>
                                Delete
                            </Button>
                        </div>
                    )}

                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)} 
                    {/* convert this HTML string into React elements. */}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post
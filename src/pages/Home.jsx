
import React, { useEffect, useState } from 'react';
import appwriteservice from '../appwrite/conf'
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        appwriteservice.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)

            }
        })

    }, [])

    if (posts.length === 0) {
        return (
            <div className="min-h-screen w-full flex flex-col justify-center bg-gray-50">
                <Container className="max-w-screen-lg mx-auto px-4">
                    <div className="flex flex-wrap justify-center">
                        <div className="p-4 w-full text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 hover:text-gray-500 transition-colors duration-300">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )

    }
    return (
        <div className="min-h-screen w-full py-10 bg-white">
            <Container className="max-w-screen-lg mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home

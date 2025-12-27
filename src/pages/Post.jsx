// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteservice from "../appwrite/conf";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";

// export default function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteservice.getPost(slug).then((post) => {
//                 if (post) setPost(post);
//                 else navigate("/");
//             });
//         } else navigate("/");
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteservice.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteservice.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };

//     return post ? (
//         <div className="py-8">
//             <Container>
//                 <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                     <img
//                     // change in fileViiew 
//                         src={appwriteservice.getFileView(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-xl"
//                     />

//                     {isAuthor && (
//                         <div className="absolute right-6 top-6">
//                             <Link to={`/edit-post/${post.$id}`}>
//                                 <Button bgColor="bg-green-500" className="mr-3">
//                                     Edit
//                                 </Button>
//                             </Link>
//                             <Button bgColor="bg-red-500" onClick={deletePost}>
//                                 Delete
//                             </Button>
//                         </div>
//                     )}
//                 </div>
//                 <div className="w-full mb-6">
//                     <h1 className="text-2xl font-bold">{post.title}</h1>
//                 </div>
//                 <div className="browser-css">
//                     {parse(post.content)}
//                 </div>
//             </Container>
//         </div>
//     ) : null;
// }



import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteservice from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (!slug) {
            navigate("/");
            return;
        }

        appwriteservice.getPost(slug).then((post) => {
            if (!post) {
                navigate("/");
                return;
            }

            // 🔐 FINAL SECURITY CHECK
            // Only owner can view inactive post
            if (post.status !== "active" && post.userId !== userData?.$id) {
                navigate("/");
                return;
            }

            setPost(post);
        });
    }, [slug, userData, navigate]);

    const deletePost = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        const status = await appwriteservice.deletePost(post.$id);
        if (status) {
            if (post.featuredImage) {
                appwriteservice.deleteFile(post.featuredImage);
            }
            navigate("/");
        }
    };

    if (!post) return null;

    return (
        <div className="py-8">
            <Container>

                {/* Featured Image / Placeholder */}
                <div className="w-full flex justify-center mb-6 relative border rounded-xl p-2">

                    {post.featuredImage ? (
                        <img
                            src={appwriteservice.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl max-h-[500px] object-cover w-full"
                        />
                    ) : (
                        <div className="
                            w-full h-[300px]
                            flex items-center justify-center
                            bg-gradient-to-br from-indigo-500 to-purple-600
                            rounded-xl
                        ">
                            <span className="text-6xl font-bold text-white">
                                {post.title.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}

                    {/* Owner Actions */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Title */}
                <div className="w-full mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {post.title}
                    </h1>

                    {/* Draft badge */}
                    {post.status !== "active" && isAuthor && (
                        <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold
                            bg-yellow-100 text-yellow-700 rounded-full">
                            Draft / Inactive
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="browser-css prose max-w-none">
                    {parse(post.content)}
                </div>

            </Container>
        </div>
    );
}

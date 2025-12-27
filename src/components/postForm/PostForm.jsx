// import React, {  useCallback } from 'react';
// import appwriteservice from "../../appwrite/conf"
// import { useForm } from 'react-hook-form';
// import { Button, Input, Select, RTE } from '../index'
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || '',
//             slug: post?.$id || '',
//             content: post?.content || '',
//             status: post?.status || 'active',

//         },
//     });

//     const navigate = useNavigate()
//     // HERE 1 DEBUG AS SELECTOR SYNTAX INCORRECT
//     const userData = useSelector((state) => state.auth && state.auth.userData)

//     const submit = async (data) => {
//         if (post) {
//           const file = data.image[0] ? await appwriteservice.uploadFile(data.image[0]) : null;
//            if (file) {
//                 appwriteservice.deleteFile(post.featuredImage)
//             }
//             const dbPost = await appwriteservice.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined,
//             });
//             if (dbPost) {
//                 navigate(`/post/${dbPost.id}`)

//             }

//         }
//         else {// improve the concept
//             const file = await appwriteservice.uploadFile(data.image[0]);

//             if (file) {
//                 const fileId = file.$id
//                 data.featuredImage = fileId
//                 const dbPost = await appwriteservice.createPost({
//                     // trying to change it if helps
//                     ...data, userId: userData?.$id
//                 })
//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`)
//                 }
//             }

//         }

//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, [])

//     // dekhna ha esee
//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 // HERE ONE ONE MORE ERROR
//                 setValue('slug', slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => {
//             subscription.unsubscribe();
//         }

//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         <img
//                         // CHANGE THE FILEVIEW
//                             src={appwriteservice.getFileView(post.featuredImage)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     )
// }

import React, { useCallback } from "react";
import appwriteservice from "../../appwrite/conf";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth?.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteservice.uploadFile(data.image[0])
        : null;

      if (file) appwriteservice.deleteFile(post.featuredImage);

      const dbPost = await appwriteservice.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.id}`);
    } else {
      // const file = await appwriteservice.uploadFile(data.image[0]);
      // if (file) {
      //     data.featuredImage = file.$id;
      //     const dbPost = await appwriteservice.createPost({
      //         ...data,
      //         userId: userData?.$id,
      //     });
      //     if (dbPost) navigate(`/post/${dbPost.$id}`);
      // }
      let featuredImage = null;

      if (data.image && data.image.length > 0) {
        const file = await appwriteservice.uploadFile(data.image[0]);
        featuredImage = file.$id;
      }

      const dbPost = await appwriteservice.createPost({
        ...data,
        featuredImage,
        userId: userData?.$id,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full">
      {/* Top Inputs */}
      <div className="mb-6 space-y-4">
        <Input
          label="Title"
          placeholder="Write a powerful title..."
          className="text-lg"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="auto-generated-slug"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Content Editor */}
        <div className="lg:col-span-8">
          <div
            className="
                        min-h-[70vh]
                        bg-white
                        rounded-xl
                        shadow-sm
                        border border-gray-100
                        p-4
                    "
          >
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <Input
              label="Featured Image"
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image")}
            />

            {post && (
              <div className="mt-4 overflow-hidden rounded-lg">
                <img
                  src={appwriteservice.getFileView(post.featuredImage)}
                  alt={post.title}
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <Select
              options={["active", "inactive"]}
              label="Status"
              {...register("status", { required: true })}
            />
          </div>

          {/* Action */}
          <div className="sticky top-24">
            <Button
              type="submit"
              className="
                                w-full py-3 text-lg font-semibold text-white
                                bg-gradient-to-r from-indigo-600 to-purple-600
                                hover:from-indigo-700 hover:to-purple-700
                                shadow-lg hover:shadow-xl
                                transition-all duration-300
                            "
            >
              {post ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

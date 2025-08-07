
import React, {  useCallback } from 'react';
import appwriteservice from "../../appwrite/conf"
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',

        },
    });


    const navigate = useNavigate()
    // HERE 1 DEBUG AS SELECTOR SYNTAX INCORRECT
    const userData = useSelector((state) => state.auth && state.auth.userData)


    const submit = async (data) => {
        if (post) {
          const file = data.image[0] ? await appwriteservice.uploadFile(data.image[0]) : null;
           if (file) {
                appwriteservice.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteservice.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.id}`)

            }

        }
        else {// improve the concept 
            const file = await appwriteservice.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteservice.createPost({
                    // trying to change it if helps 
                    ...data, userId: userData?.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }


        }

    };


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, [])


    // dekhna ha esee 
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                // HERE ONE ONE MORE ERROR
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });


        return () => {
            subscription.unsubscribe();
        }

    }, [watch, slugTransform, setValue]);











    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                        // CHANGE THE FILEVIEW
                            src={appwriteservice.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}





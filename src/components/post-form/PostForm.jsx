import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import service from '../../services/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input, Button, Select, RTE } from '../index'
import conf from '../../conf/conf'

// Post is the card the user clicks on
function PostForm({ post }) {
    // useForm hook gives us multiple events, like
    // watch:- to watch a specfic field 
    // setValue and GetValue: to interact with the fields
    // control to pass the control
    const { register, handleSubmit, watch, setValue, getValues,
        control
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    // Getting the data stored in the temporary store 
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    // The data will be submitted to the database not the store 
    const submit = async (data) => {

        // Now either the post exists needs updation or a new post is created 
        console.log(conf.appwriteUrl);
        console.log(conf.appwriteBucketId);
        if (post) {
            // File Handling uploading the new file 
            // The file will be in the data sent
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if (file) {
                await service.deleteFile(post.featuredImage);
            }
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else { // Creating a new post if the post does not exist

            const file = await service.uploadFile(data.image[0]);
            console.log('file  uploaded');

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log('Data is :', userData);
                console.log('user Data is,', userData.$id)
                data.userId = userData.$id;
                console.log('Data is :', data);
                const dbPost = await service.createPost({
                    ...data
                })
                console.log("gone inside the post creation");

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                } else {
                    console.log("Error in creating the post");
                    navigate(`/`)
                    await service.deleteFile(fileId);
                    console.log(
                        "File deleted");
                }
            }
        }
    }

    // Transforming the slug into approiate format
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-") //Regex 
                .replace(/\s/g, "-")

        return '';
    }, []);
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }));
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])

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
                            src={service.getFilePreview(post.featuredImage)}
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

export default PostForm
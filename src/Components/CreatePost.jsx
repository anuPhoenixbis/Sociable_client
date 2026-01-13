import React from 'react'
import { IoMdImage } from "react-icons/io";
import { FaVideo  } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import { useState } from 'react';
import { setPosts } from '../State';
import {useSelector,useDispatch} from 'react-redux'
import { AiFillAudio } from "react-icons/ai";
import Dropzone from 'react-dropzone';
import { MdDelete } from "react-icons/md";

const CreatePost = ({
    picturePath
}) => {
    
    const dispatch = useDispatch()
    const [isImage,setIsImage] = useState(false);
    const [image,setImage] = useState(null);
    const [post,setPost] = useState("");
    const {_id} = useSelector((state)=>state.user)
    const token = useSelector((state)=>state.token)

    const handlePost = async () => {
        // console.log("post started")
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        // console.log("data received")
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        // console.log("req done")
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
        // console.log("post ended")
    };
  return (
    <div className='card h-30 rounded-xl bg-transparent p-4 space-y-4'>
        {/* Input section */}
        <div className="flex items-center gap-3">
            <img src={`${import.meta.env.VITE_API_BASE_URL}/assets/${picturePath}`}  className='rounded-full h-12 w-12 object-cover ml-8'/>
            <input type="text" placeholder="What's on your mind..." onChange={(e)=>setPost(e.target.value)} value={post} className="input input-bordered w-full rounded-full bg-base-200"/>
            {isImage && (
                // dropzone for image
                    <>
                        <div className="form-control hover:outline-solid hover:outline-info transition-all border-transparent cursor-pointer outline-dashed outline-info rounded-lg p-4">
                        <Dropzone
                        accept={{ "image/*": [] }}
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                            <input {...getInputProps()} />

                            {!image ? (
                                <p className="text-sm text-gray-500">
                                Drag & drop or click to upload the image
                                </p>
                            ) : (
                                <div className="flex justify-between items-center w-30">
                                <div className="flex items-center gap-2">
                                    <img
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    className="h-10 w-10 rounded object-cover"
                                    />
                                    <span className="text-sm">{image.name}</span>
                                </div>

                                <MdDelete
                                    className="cursor-pointer w-10 text-red-500"
                                    onClick={() => {
                                            setIsImage(false); 
                                            setImage(null);
                                        }}
                                />
                                </div>
                            )}
                            </div>
                        )}
                        </Dropzone>
                    </div>
                    </>
                )}
        </div>
        <div className='mx-8'>
            {/* buttons for post */}
            <div className="flex justify-center text-sm text-base-content/70">
                <button className="flex items-center gap-2 mx-8 hover:text-info cursor-pointer"  onClick={()=>{
                        setIsImage(!isImage);
                    }}>
                    <IoMdImage/><span>Image</span>
                </button>
                <button className="flex items-center gap-2 hover:text-info cursor-pointer" disabled={!post && !image} onClick={()=>handlePost()}>
                    <BsSend />Post
                </button>
            </div>
        </div>
    </div>
  )
}

export default CreatePost
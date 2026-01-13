import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { BiComment,BiSolidComment  } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../State';
import Friend from './Friend';

const PostCard = ({
        postId,
        postUserId,
        name,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments
      }) => {
        const [isComment,setIsComment] = useState(false);
        const [commentText,setCommentText] = useState("");
        const loggedInUserId = useSelector((state)=>state.user._id);
        const dispatch = useDispatch();
        const token = useSelector((state)=>state.token);
        // imp data modelling : likes map prevent multiple likes from the same user
        const isLiked = Boolean(likes?.[loggedInUserId]); // safe-check likes before indexing
        const likeCount = Object.keys(likes || {}).length; // handle undefined likes


        const patchLike = async()=>{
            const response = await fetch(`http://localhost:3000/posts/${postId}/like`,{
                method: "PATCH",
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: loggedInUserId })
            });
            await response.json();
            
            // Refetch all posts to update the feed
            const postsResponse = await fetch(`http://localhost:3000/posts`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const allPosts = await postsResponse.json();
            dispatch(setPosts({ posts: allPosts }));
        };

        const patchComment = async()=>{
            // console.log("entered the patch comment")
            if(!commentText.trim()) return; //prevent empty comments
            // console.log("patch sent")
            await fetch(`http://localhost:3000/posts/${postId}/comment`,{
                method: "PATCH",
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment: commentText })
            });
            // console.log("patch done")
            // Refetch all posts to update comments
            const postsResponse = await fetch(`http://localhost:3000/posts`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log("refetch done")
            const allPosts = await postsResponse.json();
            dispatch(setPosts({ posts: allPosts }));
            
            setCommentText(""); // clear input after submission
            // console.log("commnet added")
        }


  return (
    <div className='card bg-base-300/80 backdrop-blur-md border border-base-content/10 shadow-lg rounded-box p-4 space-y-4'>
        <Friend
            friendId={postUserId}
            name={name}
            subtitle={location}
            userPicturePath={userPicturePath}
            />
        {/* description */}
        <p className="text-sm">{description}</p>
        {/* image */}
        <img
        src={`http://localhost:3000/assets/${picturePath}`}
        alt="post"
        className="rounded-xl w-full object-cover"
        />

        {/* actions */}
        <div className="flex justify-between items-center text-sm">
            <div className="flex gap-4">
                {/* like */}
                <button className="flex items-center gap-1 hover:text-info" onClick={patchLike}>
                    {isLiked ? <FaHeart className='w-5 h-5 bg-transparent'/> : <CiHeart className='w-5 h-5 bg-transparent'/>}<span className='ml-0.5 mr-1.5'>{likeCount}</span>
                </button>
                {/* comment */}
                <button className="flex items-center gap-1 hover:text-info" onClick={()=>setIsComment(!isComment)}>
                    {isComment ? 
                    <BiSolidComment  className='w-4 h-4 bg-transparent'/>:
                    <BiComment className='w-4 h-4 bg-transparent'/>}
                </button>
                {/* share */}
                <button className="flex items-center gap-1 hover:text-info">
                    <FaShare className='w-4 h-4 bg-transparent'/>
                </button>
            </div>
        </div>
        <div>
            <span className="text-xs text-gray-500">{comments?.length || 0} comment<span>{comments?.length!=1 ? 's' : ''}</span></span>
            {isComment && 
            <>
            {comments?.map((comment,index)=>(
                <div key={`comment-${index}`}>
                    <div className="divider my-2"/>
                    <p className="text-sm">{comment}</p>
                </div>
            ))}
            <input 
                type="text" 
                value={commentText}
                onChange={(e)=>setCommentText(e.target.value)}
                placeholder="Write a comment..."  
                className="mt-4 input input-bordered border-transparent w-full rounded-selector bg-base-200"
                onKeyPress={(e)=>e.key === 'Enter' && patchComment()}//submit comment on enter key
                />
                <button  className="mt-2 btn btn-sm btn-ghost hover:bg-info" onClick={patchComment}>Submit</button>
            </>}
        </div>
    </div>
  )
}

export default PostCard
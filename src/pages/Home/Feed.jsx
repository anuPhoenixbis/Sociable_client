import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../Components/CreatePost";
import PostCard from "../../Components/PostCard";
import { setPosts } from "../../State";
import { useEffect } from "react";

// Feed.jsx
const Feed = ({user, isProfile=false}) => {
  // console.log(user._id)//receiving
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.posts);
    const {picturePath} = useSelector((state)=>state.user);
    const token = useSelector((state)=>state.token);

    // addressing 2 api calls here based on isProfile 
    // if(isProfile) : fetch the posts for that user 
    // else : fetch all posts

    const getPosts = async()=>{
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`,{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        dispatch(setPosts({ posts: data}))
    }

    const getUserPosts = async()=>{
      console.log("get user posts start")
      console.log(`userid ${user._id}`)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${user._id}/posts`,{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log("req done")
        const data = await response.json();
        dispatch(setPosts({ posts: data}))
        console.log("get user posts end")
    }

    useEffect(()=>{
        if(isProfile){//if we are on profile page fetch that users' posts otherwise fetch all posts
            getUserPosts();
        }else getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
    // console.log(posts)

  return (
    <div className="space-y-4">
      {/* PostCreator */}
      {isProfile ? null : <CreatePost picturePath={picturePath}/>}
      {/* posts */}
      {/* {console.log("Redux posts:", posts)} */}
      {posts && posts.length > 0 && posts.map((post)=>{
        const {
            _id,
            userId,
            firstName,
            lastName,
            description,
            picturePath,
            userPicturePath,
            location,
            likes,
            comments
        } = post;
        
        return (
            <div className='mt-10' key={_id}>
                <PostCard
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                />
            </div>
        )
    })}
    </div>
  );
};

export default Feed;

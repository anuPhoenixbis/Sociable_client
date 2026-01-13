import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../Components/PostCard";
import { setPosts } from "../../State";
import { useEffect } from "react";

const ProfileFeed = ({user,isProfile=true}) => {
    // console.log(user)
        const dispatch = useDispatch();
        const posts = useSelector((state)=>state.posts);
        const token = useSelector((state)=>state.token);

        // addressing 2 api calls here based on isProfile 
        // if(isProfile) : fetch the posts for that user 
        // else : fetch all posts

        const getPosts = async()=>{
            const response = await fetch(`http://localhost:3000/posts`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            dispatch(setPosts({ posts: data}))
        }

        const getUserPosts = async()=>{
            const response = await fetch(`http://localhost:3000/posts/${user._id}/posts`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            dispatch(setPosts({ posts: data}))
        }

        useEffect(()=>{
            if(isProfile && user?._id){//if we are on profile page fetch that users' posts otherwise fetch all posts
                getUserPosts();
            }else if(!isProfile){
                getPosts();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[user?._id,dispatch])
        // console.log(posts)

    return (
        <div className="space-y-4">
            {posts && posts[0].map(({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments
            })=>(
                <div className='mt-10' key={_id}>
                <PostCard
                    key={_id}
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
            ))}
        </div>
    );
};

export default ProfileFeed
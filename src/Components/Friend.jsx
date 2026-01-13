import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends, setUser } from '../State';
import { RiUserFollowFill,RiUserUnfollowFill  } from "react-icons/ri";

const Friend = ({
    friendId,
    name,
    subtitle,
    userPicturePath
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=> state.user);
  const {_id, friends} = user;
  const token = useSelector((state)=> state.token);
  
  // Check if friendId is in friends array (friends are stored as strings/IDs)
  const isFriend = friends.includes(friendId);

  const patchFriend = async()=>{
    try {
        const response = await fetch(`http://localhost:3000/users/${_id}/${friendId}`,{
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
        })
        const updatedFriends = await response.json();
        
        // Update Redux with the updated friends list
        dispatch(setFriends({ friends: updatedFriends }));
        
        // Also update the user object in Redux
        dispatch(setUser({
          ...user,
          friends: updatedFriends.map(f => f._id)  // Store friend IDs in user state
        }));
    } catch (error) {
        console.error("Error updating friend:", error);
    }
  }

  return (
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
            <img
                src={`http://localhost:3000/assets/${userPicturePath}`}
                alt="user"
                className="rounded-full h-12 w-12 object-cover cursor-pointer"
                onClick={()=>{
                    navigate(`/profile/${friendId}`);
                    navigate(0);
                }}
            />
            <div>
                <h4 className="font-semibold">{name}</h4>
                <p className="text-xs text-base-content/60">{subtitle}</p>
            </div>
          <button className="btn btn-ghost btn-sm hover:btn-info" onClick={() =>patchFriend()}>
            {isFriend ? <RiUserUnfollowFill className='h-4 w-4'/> : <RiUserFollowFill className='h-4 w-4'/>}
          </button>
        </div>
    </div>
  )
}

export default Friend
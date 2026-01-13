/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import Friend from "../../Components/Friend.jsx";
import {useSelector} from 'react-redux'



const ProfileFriends = ({user}) => {
    const [friends,setFriends] = useState([]);
    const token = useSelector((state)=>state.token);
    console.log(user)
    
    const getFriends = async()=>{
        try {
            const response = await fetch(`http://localhost:3000/users/${user._id}/friends`,{
                method: "GET",
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            const data = await response.json();
            setFriends(data);
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    }

    useEffect(()=>{
        if(user?._id){
            getFriends();
        }
    },[user?._id,token]);
    return (
    <ul className="list bg-base-300 rounded-box shadow-md">
      {friends && friends.map((friend)=>{
        return(
          <li className="list-row" key={friend._id}>
            <Friend
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.location}
                userPicturePath={friend.picturePath}
                />
          </li>
        )
      })}
    </ul>
  );
};
export default ProfileFriends
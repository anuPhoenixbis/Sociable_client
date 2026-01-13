import Friend from "../../Components/Friend.jsx";
import {useSelector} from 'react-redux'
import {useEffect, useState} from 'react'

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const { _id } = useSelector((state)=> state.user);
  const token = useSelector((state)=> state.token);
  
  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${_id}/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFriends(data);
    };
    
    if(_id && token) getFriends();
  }, [_id, token]);

  return (
    <ul className="list bg-base-300 rounded-box shadow-md">
      {friends && friends.map((friend)=>(
        <li className="list-row" key={friend._id}>
          <Friend
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.location}
            userPicturePath={friend.picturePath}
          />
        </li>
      ))}
    </ul>
  );
};

export default FriendList;
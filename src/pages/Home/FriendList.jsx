import Friend from "../../Components/Friend.jsx";

import {useSelector} from 'react-redux'

// FriendList.jsx
const FriendList = () => {
  const posts = useSelector((state)=> state.posts);
  const { _id } = useSelector((state)=> state.user);
  // get friends from posts data
  const friendsData = posts && posts[0].map(({
    userId,
    firstName,
    lastName,
    location,
    userPicturePath
  }) => ({
    userId,
    name: `${firstName} ${lastName}`,
    location,
    userPicturePath
  }));

// Remove duplicate friends by userId
    const uniqueFriends = friendsData ? [...new Set(friendsData.map(f => f.userId))].map(id => 
      friendsData.find(f => f.userId === id)
    ) : [];
    const filteredFriends = uniqueFriends?.filter(friend => friend.userId !== _id);//exclude self
    return (
    <ul className="list bg-base-300 rounded-box shadow-md">
      {filteredFriends && filteredFriends.map((friend)=>{
        return(
          <li className="list-row">
            <Friend
                friendId={friend.userId}
                name={friend.name}
                subtitle={friend.location}
                userPicturePath={friend.userPicturePath}
                />
          </li>
        )
      })}
    </ul>
  );
};

export default FriendList;

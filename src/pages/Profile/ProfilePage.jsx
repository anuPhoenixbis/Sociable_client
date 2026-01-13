/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import ProfileView from './ProfileView'
import Navbar from '../Navbar/Navbar'
import ProfileFriends from './ProfileFriends'
import ProfileFeed from './ProfileFeed'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Feed from '../Home/Feed'

const ProfilePage = () => {
  const [user,setUser] = useState(null);
  const {userId} = useParams();
  const token = useSelector((state)=>state.token);

  const getUser = async()=>{
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`,{
      method: "GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json();
    console.log(data)
    setUser(data);
  }
  useEffect(()=>{
    getUser();
  },[])

  if(!user) return null;

  return (
    <div className='min-h-screen bg-base-100'>
      {/* navbar */}
      <Navbar/>

      {/* main content */}
      <div className="flex justify-center px-6 mt-6">
        <div className="lg:flex w-full max-w-7xl gap-6">

          {/* left part */}
          <div className="lg:w-[30%] w-full rounded-selector">
            {/* <LeftSidebar/> */}
            <ProfileView
              user={user}
              />
            <br/>
            <ProfileFriends user={user}/>
          </div>

          {/* center */}
          <div className="flex-1 rounded-selector">
            <Feed user={user} isProfile={true}/>
            {/* <ProfileFeed user={user}/> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
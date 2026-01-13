import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'

const LeftSidebar = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    
    
    if(!user) return null;
    const {
        firstName,
        lastName,
        friends,
        picturePath,
        occupation,
        location,
        viewedProfile,
        impressions
    } = user


  return (
    <div className="card bg-base-300 h-82 p-4 space-y-4 rounded-selector">
        {/* profile */}
        <div className="flex items-center gap-4">
            <img src={`http://localhost:3000/assets/${picturePath}`} className="rounded-full h-16 w-16 object-cover" />
            <div>
                <h4 className="mt-2 font-semibold">{firstName} {lastName}</h4>
                <p className="text-sm text-base-content/60">
                {friends?.length || 0} friends
                </p>
            </div>
        </div>
        <p className="text-sm text-gray-500">{occupation}</p>
        <div className="text-sm text-gray-500">
            {location}
        </div>

        {/* profile stats */}
        <div className="divider"/>
            <div className="flex justify-between text-sm">
                <span>Profile views</span>
                <span className='font-semibold'>{viewedProfile}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span>Post Impressions</span>
                <span className='font-semibold'>{impressions}</span>
            </div>

        {/* to view profile */}
        {/* later we should navigate to the profile from here */}
        <button className="btn btn-sm btn-outline btn-info w-full" onClick={()=>navigate(`http://localhost:3000/profile/${user._id}`)}>View Profile</button>


    </div>
  );
};

export default LeftSidebar;

import React from 'react'

const ProfileView = ({
        user
}) => {
    
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
    <div className="card bg-base-300 h-72 p-4 space-y-4 rounded-selector">
        {/* profile */}
        <div className="flex items-center gap-4">
            <img src={`${import.meta.env.VITE_API_BASE_URL}/assets/${picturePath}`} className="rounded-full h-16 w-16 object-cover" />
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

    </div>
  );
};

export default ProfileView
import React from 'react'
import Navbar from '../Navbar/Navbar'
import LeftSidebar from './LeftSidebar'
import Feed from './Feed'
import RightSidebar from './RightSidebar'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-base-100'>
      {/* navbar */}
      <Navbar/>

      {/* main content */}
      <div className="flex justify-center px-6 mt-6">
        <div className="flex w-full max-w-7xl gap-6">

          {/* left part */}
          <div className="hidden lg:block w-[25%] rounded-selector">
            <LeftSidebar/>
          </div>

          {/* center */}
          <div className="flex-1 rounded-selector">
            <Feed/>
          </div>

          {/* right part*/}
          <div className="hidden xl:block w-[25%] rounded-selector">
            <RightSidebar/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
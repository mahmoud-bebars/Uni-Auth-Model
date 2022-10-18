import React, { useState, useEffect } from 'react'

// importing user info hook to use it in the home
import getUserInfo from '../hooks/getUserInfo'

import reactLogo from '../logo.svg'
import nodeLogo from '../logo2.svg'
import tailwindLogo from '../logo3.svg'

const Home = () => {
  // distructure the user info to use it in the alret div
  const { userInfo } = getUserInfo()

  const [username, setusername] = useState()

  // set user info and page title with every loading
  useEffect(() => {
    if (userInfo != null) {
      setusername(userInfo.username)
    } else {
      setusername()
    }
    document.title = 'Home - Auth System'
  }, [userInfo, username])

  return (
    <div>
      <div className='bg-blue-100 p-3 m-2 rounded-md border border-blue-300'>
        <div className='flex m-3'>
          <img className='mx-auto h-32 w-32 ' src={reactLogo} alt='logo' />
          <img className='mx-auto h-32 w-32 ' src={nodeLogo} alt='logo' />
          <img className='mx-auto h-32 w-32 ' src={tailwindLogo} alt='logo' />
        </div>

        <p className='text-xl font-semibold text-blue-400 text-center'>
          Auth System UI Starter
        </p>
        <p className='text-sm font-light text-blue-400 text-center'>
          Made with React & Tailwind
        </p>
      </div>
      {username ? (
        <div className='bg-green-100 p-3 m-2 rounded-md border border-green-300'>
          <p className='text-xl font-semibold text-green-400 text-center'>
            Welcome
          </p>
          <p className='text-sm font-light text-green-400 text-center'>
            @{username}
          </p>
        </div>
      ) : (
        <div className='bg-yellow-100 p-3 m-2 rounded-md border border-yellow-300 text-center'>
          <p className='text-xl font-semibold text-yellow-400 text-center'>
            Please login or ssgin up
          </p>
          <a href='/login' className='text-sm font-bold text-yellow-400 '>
            Login
          </a>
        </div>
      )}
    </div>
  )
}

export default Home

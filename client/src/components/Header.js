import React, { useState, useEffect } from 'react'
import { MenuIcon } from '@heroicons/react/solid'
import useAuthListener from '../hooks/useAuthListener'
import { useNavigate } from 'react-router'

import Axios from 'axios'

import { SERVER } from '../constants/serverUrl'

const Header = () => {
  const { user } = useAuthListener()

  const [navbarOpen, setNavbarOpen] = useState(false)

  const [isLogged, setisLogged] = useState(false)
  // set isLogged state to use it to show components in the Header
  useEffect(() => {
    if (user) {
      setisLogged(true)
    } else if (!user) {
      setisLogged(false)
    }
  }, [user])
  const navigate = useNavigate()

  // log out function handler
  const handleLogOut = (e) => {
    e.preventDefault()
    const refreshToken = localStorage.getItem('refresh')
    const userid = localStorage.getItem('userid')
    const request = {
      headers: { refresh: refreshToken, userid: userid },
    }
    Axios.post(SERVER + 'auth/Logout', request).then((response) => {
      if (response.data.auth === false) {
        setisLogged(false)
        navigate('/')
        localStorage.removeItem('refresh')
        localStorage.removeItem('authorization')
        localStorage.removeItem('userid')
        console.log(response)
      } else if (response.data.auth === true) {
        console.log(response)
      }
    })
  }

  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <a
              className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'
              href='/'
            >
              Auth System Starter Templete
            </a>
            <button
              className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuIcon className='w-7 h-7' />
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id='example-navbar-danger'
          >
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              <li className='nav-item'>
                <a
                  className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  href='/'
                >
                  <span className='ml-2'>Home</span>
                </a>
              </li>

              {isLogged ? (
                <>
                  <li className='nav-item'>
                    <a
                      className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                      href='/dashboard'
                    >
                      <span className='ml-2'>Dashboard</span>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <button
                      className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:text-red-400'
                      onClick={handleLogOut}
                    >
                      <span className='ml-2'>Log Out</span>
                    </button>
                  </li>
                </>
              ) : (
                <li className='nav-item'>
                  <a
                    className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                    href='/login'
                  >
                    <span className='ml-2'>Login</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header

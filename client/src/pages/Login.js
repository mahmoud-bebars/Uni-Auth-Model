import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ExclamationCircleIcon, LockClosedIcon } from '@heroicons/react/solid'
import Axios from 'axios'
import logo from '../logo.svg'
import { SERVER } from '../constants/serverUrl'

const Login = () => {
  const [forgetPassword, setForgetPassword] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })
  const [alert, setAlert] = useState({
    show: false,
    varient: '',
    message: '',
  })
  const navigate = useNavigate()
  useEffect(() => {
    if (alert.show === true) {
      const timer = setTimeout(() => {
        setAlert({
          show: false,
          varient: '',
          message: '',
        })
      }, 5000)
      return () => clearTimeout(timer)
    }
    document.title = 'Login - Auth System'
  }, [alert])
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    Axios.post(SERVER + 'auth/Login', user).then(
      (response) => {
        if (response.data.Auth === true) {
          setAlert({
            show: true,
            varient: 'green-alert',
            message: response.data.message,
          })
          localStorage.setItem(
            'authorization',
            'Bearer ' + response.data.accessToken
          )
          localStorage.setItem('refresh', response.data.refreshToken)
          localStorage.setItem('userid', response.data.userid)
          navigate('/dashboard')
        } else if (response.data.Auth === false) {
          setAlert({
            show: true,
            varient: 'red-alert',
            message: response.data.message,
          })
        }
      },
      (error) => {
        setAlert({
          show: true,
          varient: 'red-alert',
          message: `${error}`,
        })
      }
    )
  }
  const handleForget = (e) => {
    e.preventDefault()

    Axios.post(SERVER + 'auth/ResetPass', user.email).then(
      (response) => {
        if (response.data.reset === true) {
          setAlert({
            show: true,
            varient: 'green-alert',
            message: response.data.message,
          })
          localStorage.setItem(
            'authorization',
            'Bearer ' + response.data.accessToken
          )
          localStorage.setItem('refresh', response.data.refreshToken)
          localStorage.setItem('userid', response.data.userid)
        } else if (response.data.reset === false) {
          setAlert({
            show: true,
            varient: 'red-alert',
            message: response.data.message,
          })
        }
      },
      (error) => {
        setAlert({
          show: true,
          varient: 'green-alert',
          message: error,
        })
      }
    )
  }

  return (
    <div className='login-pattern flex items-center justify-center'>
      <div className='container bg-white w-96 h-90 shadow-md rounded-lg'>
        <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full space-y-6'>
            <img className='mx-auto h-32 w-auto' src={logo} alt='logo' />
            {!forgetPassword ? (
              // Login form
              <>
                <div>
                  <h2 className='text-center text-xl font-extrabold text-gray-900'>
                    Login to your account
                  </h2>
                </div>

                <div>
                  <label htmlFor='email-address' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    value={user.email}
                    onChange={handleChange}
                    required
                    className='edit-input'
                    placeholder='Email address'
                  />
                </div>
                <div>
                  <label htmlFor='confirm-password' className='sr-only'>
                    Password
                  </label>
                  <input
                    name='password'
                    type='password'
                    value={user.password}
                    onChange={handleChange}
                    required
                    className='edit-input'
                    placeholder='Password'
                  />
                </div>

                <div className='text-sm text-center'>
                  <button
                    onClick={() => setForgetPassword(true)}
                    className='font-medium text-blue-500 hover:text-blue-900'
                  >
                    Forgot your password?
                  </button>
                </div>

                <div>
                  <button type='submit' onClick={handleLogin} className='btn '>
                    <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                      <LockClosedIcon
                        className='h-5 w-5 text-blue-400 group-hover:text-blue-600'
                        aria-hidden='true'
                      />
                    </span>
                    Login
                  </button>
                </div>
                {alert.show ? (
                  <div
                    className={`flex rounded-lg p-2 mb-3 text-sm ${alert.varient} items-center`}
                  >
                    <ExclamationCircleIcon className='h-8 w-8 mr-2' />
                    <div>{alert.message}</div>
                  </div>
                ) : null}
                <div className='text-sm text-center'>
                  <button
                    onClick={() => navigate('/sign-up')}
                    className='font-medium text-blue-500 hover:text-blue-900'
                  >
                    Don't Have an Account Yet?
                  </button>
                </div>
              </>
            ) : (
              // Forget Password form
              <>
                <div>
                  <h2 className='mt-6 text-center text-xl font-extrabold text-gray-900'>
                    Please Enter your Email
                  </h2>
                </div>
                <div className='mt-8 space-y-6'>
                  <div>
                    <label htmlFor='email-address' className='sr-only'>
                      Email address
                    </label>
                    <input
                      name='email'
                      type='email'
                      value={user.email}
                      onChange={handleChange}
                      onClick={handleForget}
                      required
                      className='edit-input'
                      placeholder='Email address'
                    />
                  </div>

                  <p className='text-center mt-3 text-sm text-gray-400'>
                    The New password is secured, but change when login again
                    please...
                  </p>
                  <div>
                    <button
                      type='submit'
                      onClick={handleForget}
                      className='btn'
                    >
                      <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                        <LockClosedIcon
                          className='h-5 w-5 text-blue-400 group-hover:text-blue-600'
                          aria-hidden='true'
                        />
                      </span>
                      Send New Password
                    </button>
                  </div>
                </div>
                <div className='text-sm text-center'>
                  <button
                    onClick={() => setForgetPassword(false)}
                    className='font-medium text-blue-500 hover:text-blue-900'
                  >
                    Back to Login Again
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

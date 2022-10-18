import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LockClosedIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import OtpInput from 'react-otp-input'
import Axios from 'axios'
import logo from '../logo.svg'
import { SERVER } from '../constants/serverUrl'

const SginUp = () => {
  // user state will be used to send data to the backend server
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  // alert state
  const [alert, setAlert] = useState({
    show: false,
    varient: '',
    message: '',
  })
  // toggle between sgin up & mail verfiy forms
  const [mailVerfiy, setMailVerfiy] = useState(false)
  const [otp, setOtp] = useState('')

  // updating alert state and page title
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
    document.title = 'Sgin Up - Auth System'
  }, [alert])

  const navigate = useNavigate()
  // set acess oken from the local stroage to use it in mail verfiy
  const accessToken = localStorage.getItem('authorization')

  // user state change handler
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUser({ ...user, [name]: value })
  }

  const authorization = localStorage.getItem('authorization')
  // mail verfiy function handler
  const handleVerfiy = (e) => {
    e.preventDefault()

    Axios.post(SERVER + 'auth/MailVerfiy', {
      authorization: accessToken,
      otp: otp,
      headers: {
        authorization: authorization,
      },
    }).then((response) => {
      if (response.data.verfiy === true) {
        setMailVerfiy(false)
        setAlert({
          show: true,
          varient: 'green-alert',
          message: response.data.message,
        })

        navigate('/dashboard')
      } else if (response.data.verfiy === false) {
        setAlert({
          show: true,
          varient: 'red-alert',
          message: response.data.message,
        })
      }
    })
  }

  // sgin up function handler
  const handleSginUp = (e) => {
    e.preventDefault()
    Axios.post(SERVER + 'auth/SginUp', user).then(
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
          setMailVerfiy(true)
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
          varient: 'green-alert',
          message: error,
        })
      }
    )
  }

  return (
    <div className='login-pattern flex items-center justify-center'>
      <div className='container bg-white w-96 h-90 shadow-md rounded-lg m-3'>
        <div className='flex items-center justify-center py-4 px-4'>
          <div className='max-w-md w-full space-y-6'>
            <img className='mx-auto h-32 w-auto' src={logo} alt='logo' />
            <div className=' -space-y-px'>
              <div>
                {!mailVerfiy ? (
                  <>
                    <div className=' -space-y-px'>
                      <h3 className='mb-8 text-center text-xl font-bold text-gray-900'>
                        Create new Account
                      </h3>
                      <div>
                        <label htmlFor='first-name' className='sr-only'>
                          First Name
                        </label>
                        <input
                          name='firstName'
                          value={user.firstName}
                          onChange={handleChange}
                          type='text'
                          required
                          className='appearance-none edit-input'
                          placeholder='First Name'
                        />
                      </div>
                      <div>
                        <label htmlFor='last-name' className='sr-only'>
                          Last Name
                        </label>
                        <input
                          name='lastName'
                          value={user.lastName}
                          onChange={handleChange}
                          type='text'
                          required
                          className='appearance-none edit-input'
                          placeholder='Last Name'
                        />
                      </div>
                      <div>
                        <label htmlFor='username' className='sr-only'>
                          Username
                        </label>
                        <input
                          name='username'
                          value={user.username}
                          onChange={handleChange}
                          type='text'
                          required
                          className='appearance-none edit-input'
                          placeholder='Username'
                        />
                        <p className='text-sm text-gray-400 text-center m-2'>
                          your username will be used to search about you choose
                          it well...
                        </p>
                      </div>

                      <div>
                        <label htmlFor='email-address' className='sr-only'>
                          Email address
                        </label>
                        <input
                          name='email'
                          value={user.email}
                          onChange={handleChange}
                          type='email'
                          autoComplete='email'
                          required
                          className='appearance-none edit-input'
                          placeholder='Email address'
                        />
                        <p className='text-sm text-gray-400 text-center m-2'>
                          we will not share your email with any third parties
                        </p>
                      </div>
                      <div>
                        <label htmlFor='Phone Number' className='sr-only'>
                          Phone Number
                        </label>
                        <input
                          name='phone'
                          value={user.phone}
                          onChange={handleChange}
                          type='tel'
                          required
                          className='appearance-none edit-input'
                          placeholder='Phone Number'
                        />
                      </div>

                      <div>
                        <label htmlFor='password' className='sr-only'>
                          Password
                        </label>
                        <input
                          name='password'
                          value={user.password}
                          onChange={handleChange}
                          type='password'
                          required
                          className='appearance-none edit-input'
                          placeholder='Password'
                        />
                      </div>

                      <div>
                        <label htmlFor='confirm-password' className='sr-only'>
                          confirm Password
                        </label>
                        <input
                          name='confirmPassword'
                          value={user.confirmPassword}
                          onChange={handleChange}
                          type='password'
                          required
                          className='appearance-none edit-input'
                          placeholder='Confirm Password'
                        />
                      </div>
                    </div>
                    <p className='text-sm text-gray-400 text-center m-2'>
                      choose your password well and try to choose somthing you
                      remember...
                    </p>

                    <button
                      className='btn'
                      type='submit'
                      onClick={handleSginUp}
                    >
                      <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                        <LockClosedIcon
                          className='h-5 w-5 text-blue-400 group-hover:text-blue-600'
                          aria-hidden='true'
                        />
                      </span>
                      Sgin Up
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Please verfiy your Email
                      </h2>
                    </div>
                    <div className='mt-8 space-y-6'>
                      <div className='-space-y-px'>
                        <div>
                          <label htmlFor='email-address' className='sr-only'>
                            Otp Input
                          </label>
                          <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={5}
                            containerStyle={'p-3 place-content-center w-full'}
                            inputStyle={
                              'p-1 focus:bg-blue-100 w-full text-2xl rounded-lg shadow hover:shadow-lg outline-none focus:outline-none  transition-all duration-150 m-3  '
                            }
                            separator={<span> - </span>}
                          />

                          <p className='text-sm text-gray-400 text-center m-2'>
                            We have sent you an OTP to your email please enter
                            it here...
                          </p>
                        </div>
                      </div>

                      <div>
                        <button
                          type='submit'
                          onClick={handleVerfiy}
                          className='btn'
                        >
                          Verfiy Email
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {alert.show ? (
                  <div
                    className={`flex rounded-lg p-2 mb-3 text-sm ${alert.varient} items-center`}
                  >
                    <ExclamationCircleIcon className='h-8 w-8 mr-2' />
                    <div>{alert.message}</div>
                  </div>
                ) : null}

                <div className='text-sm grid place-items-center'>
                  <button
                    onClick={() => navigate('/login')}
                    className='font-medium text-blue-500 hover:text-blue-900'
                  >
                    Already have an Account?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SginUp

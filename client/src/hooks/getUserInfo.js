import { useState, useEffect } from 'react'
import Axios from 'axios'
import { SERVER } from '../constants/serverUrl'

const GetUserInfo = () => {
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    const authorization = localStorage.getItem('authorization')
    const userid = localStorage.getItem('userid')
    const request = {
      headers: { authorization: authorization, userid: userid },
    }
    Axios.get(SERVER + 'users/UserInfo', request).then((response) => {
      if (response.data.Auth === true) {
        setUserInfo(response.data)
      } else if (response.data.Auth === false) {
        setUserInfo(null)
      } else {
        setUserInfo(null)
      }
    })
  }, [])
  return { userInfo }
}

export default GetUserInfo

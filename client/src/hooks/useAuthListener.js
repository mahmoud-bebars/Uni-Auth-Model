import { useState, useEffect } from 'react'
import Axios from 'axios'
import { SERVER } from '../constants/serverUrl'

const useAuthListener = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const authorization = localStorage.getItem('authorization')
    const userid = localStorage.getItem('userid')
    const request = {
      headers: { authorization: authorization, userid: userid },
    }
    Axios.get(SERVER + 'auth/Verfiy', request).then((response) => {
      if (response.data.Auth === true) {
        setUser(response.data)
        Axios.defaults.headers.common['authorization'] =
          localStorage.getItem('authorization')
        Axios.defaults.headers.common['userid'] = localStorage.getItem('userid')
        Axios.defaults.headers.common['refresh'] =
          localStorage.getItem('refresh')
      } else if (response.data.Auth === false) {
        setUser(null)
        localStorage.removeItem('refresh')
        localStorage.removeItem('authorization')
        localStorage.removeItem('userid')
      } else {
        setUser(null)
      }
    })
  }, [])
  return { user }
}

export default useAuthListener

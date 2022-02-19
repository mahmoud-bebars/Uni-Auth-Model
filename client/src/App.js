import React, { lazy, Suspense, useState, useEffect } from 'react'
import * as ROUTES from './constants/routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// auth listener set the user data and set the accessToken(authorization),userid,refreshToken(refresh) in the local storage
import useAuthListener from './hooks/useAuthListener'
// set user context globally to use it in the entire application
import userContext from './context/userContext'

// header component only exists in the app.js
import Header from './components/Header'

// importing the pages components
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  // distructure the user context to pass it through the entire application
  const { user } = useAuthListener()
  const [isLogged, setisLogged] = useState(false)

  // updating the isLogged to set the user info or remove it
  useEffect(() => {
    if (user) {
      setisLogged(true)
    } else if (!user) {
      setisLogged(false)
    }
  }, [user])

  return (
    <userContext.Provider value={{ user }}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Header />
          <Routes>
            <Route exact path={ROUTES.HOME} element={<Home />} />
            <Route exact path={ROUTES.LOGIN} element={<Login />} />
            <Route exact path={ROUTES.SIGN_UP} element={<SignUp />} />
            {isLogged ? (
              <Route exact path={ROUTES.DASHBOARD} element={<Dashboard />} />
            ) : (
              ''
            )}
            <Route exact path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App

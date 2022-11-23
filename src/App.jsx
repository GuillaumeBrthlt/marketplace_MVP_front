import { observer } from "mobx-react-lite";
import { useUserStore } from "./contexts/UserContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Nav from "./components/Nav";
import {LoginPage} from "./pages/loginPage";
import {RegisterPage} from "./pages/registerPage";


export const App = observer(() => {
  const userStore = useUserStore()

  let localAuthToken = localStorage.auth_token;
  let cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null
  if (cookieExists) {
    const auth_token = localStorage.getItem('auth_token');
    const authTokenExists = auth_token !== undefined && auth_token !== null
    if (authTokenExists) {
      userStore.loginUserWithToken(auth_token)
    }
  }

  return (
    <Router>
      <Nav />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Routes>
      </main>
    </Router>
  )
})
import { observer } from "mobx-react-lite";
import { useUserStore } from "./contexts/UserContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from "./components/Nav";
import {LoginPage} from "./pages/loginPage";
import {RegisterPage} from "./pages/registerPage";
import ResetPasswordPage from "./pages/resetPasswordPage";
import NewPasswordPage from "./pages/newPasswordPage";
import HomePage from "./pages/homePage";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Navigate } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import AppFooter from "./components/AppFooter";
import {PropertyDetails} from "./pages/propertyDetails";
import { useEffect } from "react";
import { usePropertyStore } from "./contexts/PropertyContext";

export const App = observer(() => {
  const userStore = useUserStore()
  const propertyStore = usePropertyStore()


  let localAuthToken = localStorage.auth_token;
  let cookieExists = localAuthToken !== 'undefined' && localAuthToken !== null
  if (cookieExists) {
    const auth_token = localStorage.getItem('auth_token');
    const authTokenExists = auth_token !== undefined && auth_token !== null
    if (authTokenExists) {
      userStore.loginUserWithToken(auth_token)
    }
  }

  function PrivateRoute({ component: Page }) { 
    if (!userStore.authenticated) {
        return <Navigate to="/login"/>
    }
    return Page;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/resetpassword" element={<ResetPasswordPage />}/>
            <Route path="/new_password" element={<NewPasswordPage />}/>
            <Route path="/property/details/:id" element={<PropertyDetails />}/>
            <Route path="/dashboard" element={<PrivateRoute component={<ProfilePage />}/>}/>
          </Routes>
        </main>
        <AppFooter />
      </Router>
    </ThemeProvider>
  )
})

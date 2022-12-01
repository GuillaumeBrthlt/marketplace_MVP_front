import { observer } from "mobx-react-lite";
import { useUserStore } from "./contexts/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/header_footer/Nav";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
import ResetPasswordPage from "./pages/resetPasswordPage";
import NewPasswordPage from "./pages/newPasswordPage";
import HomePage from "./pages/homePage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Navigate } from "react-router-dom";
import { ProfilePage } from "./pages/ProfilePage";
import { EditPropertyPage } from "./pages/EditPropertyPage";
import AppFooter from "./components/header_footer/AppFooter";
import { PropertyDetails } from "./pages/propertyDetails";
import { Grid } from "@mui/material";
import { useEffect } from "react";

export const App = observer(() => {
  const userStore = useUserStore();


  let localAuthToken = localStorage.auth_token;
  let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
  if (cookieExists) {
    userStore.loginUserWithToken(localAuthToken);
  }

  
  function PrivateRoute({ component: Page }) {
    if (!userStore.authenticated) {
      return <Navigate to="/login" />;
    }
    return Page;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Grid minHeight="100vh" display="flex" flexDirection="column">
          <Nav />
          <Grid flex={1}>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/"/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/property/edit/:id"
                  element={<EditPropertyPage />}
                />
                <Route path="/resetpassword" element={<ResetPasswordPage />} />
                <Route path="/new_password" element={<NewPasswordPage />} />
                <Route
                  path="/property/details/:id"
                  element={<PropertyDetails />}
                />
                <Route
                  path="/dashboard"
                  element={<PrivateRoute component={<ProfilePage />} />}
                />
              </Routes>
            </main>
          </Grid>
          <AppFooter />
        </Grid>
      </Router>
    </ThemeProvider>
  );
});

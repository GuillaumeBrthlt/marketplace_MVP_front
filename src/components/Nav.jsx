import { observer } from 'mobx-react-lite'
import React from 'react'
import { useUserStore } from '../contexts/UserContext'
import AppBar from './appBar'
import Toolbar from './toolBar'
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'
import { Typography } from '@mui/material'


const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};


const Nav = observer(() => {
  const userStore = useUserStore()

  const Logout = () => {
    userStore.logoutUser()
  }

  if (userStore.authenticated) {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }} />
            <Typography
              variant="h6"
              underline="none"
              color="inherit"
              to="/"
              sx={{ fontSize: 24 }}
            >
              RealImmo
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography
                variant="h6"
                sx={{ ...rightLink, color: 'secondary.main', cursor: 'pointer' }}
                onClick={Logout}
              >
                Se déconnecter
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    )
  } 

  if (!userStore.authenticated) {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }} />
            <Typography
              variant="h6"
              underline="none"
              color="inherit"
              href="/premium-themes/onepirate/"
              sx={{ fontSize: 24 }}
            >
              Real Immo
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Link style={{textDecoration: 'none'}} to='/login'>
                <Typography
                  color="inherit"
                  variant="h6"
                  sx={rightLink}
                >
                  Sign In
                </Typography>
              </Link>
              <Link style={{textDecoration: 'none'}} to='/register'>
                <Typography
                  variant="h6"
                  sx={{ ...rightLink, color: 'secondary.main' }}
                >
                  Sign Up
                </Typography>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </div>
    )
  }
});

export default Nav;
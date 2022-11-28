import { observer } from 'mobx-react-lite'
import React from 'react'
import { useUserStore } from '../../contexts/UserContext'
import AppBar from './appBar'
import Toolbar from './toolBar'
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom'
import { Typography } from '@mui/material'
import {useNavigate} from 'react-router-dom'

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};


const Nav = observer(() => {
  const userStore = useUserStore()
  const navigate = useNavigate()

  const Logout = () => {
    userStore.logoutUser()
    navigate('/')
  }

  if (userStore.authenticated) {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }} />
            <Link style={{textDecoration: 'none', color: 'white'}} to='/'>
              <Typography
                variant="h6"
                underline="none"
                color="inherit"
                to="/"
                sx={{ fontSize: 24 }}
              >
                Real Immo
              </Typography>
            </Link>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link style={{textDecoration: 'none'}} to='/dashboard'>
                <Typography
                  color="inherit"
                  variant="h6"
                  sx={rightLink}
                >
                  Mon espace
                </Typography>
              </Link>
              <Typography
                variant="h6"
                sx={{ ...rightLink, color: 'secondary.main', cursor: 'pointer' }}
                onClick={Logout}
              >
                Deconnexion
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
            <Link style={{textDecoration: 'none', color: 'white'}} to='/'>
              <Typography
                variant="h6"
                underline="none"
                color="inherit"
                href="/premium-themes/onepirate/"
                sx={{ fontSize: 24 }}
              >
                Real Immo
              </Typography>
            </Link>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Link style={{textDecoration: 'none'}} to='/login'>
                <Typography
                  color="inherit"
                  variant="h6"
                  sx={rightLink}
                >
                  Connexion
                </Typography>
              </Link>
              <Link style={{textDecoration: 'none'}} to='/register'>
                <Typography
                  variant="h6"
                  sx={{ ...rightLink, color: 'secondary.main' }}
                >
                  Inscription
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
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../typography';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://www.devalamer.fr/">
        Fabulous Vocal 15
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'secondary.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 6, display: 'flex' }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 80 }}
            >
              <Grid item sx={{ display: 'flex', color: 'secondary.main' }}>
                <Box component="a" href='mailto:devalamer15@gmail.com' sx={iconStyle}>
                  <img
                    src="/assets/images/envelope.png"
                    alt="Email"
                  />
                </Box>
                <Box component="a" href="https://place-to-play.herokuapp.com/" sx={iconStyle}>
                  <img
                    src="/assets/images/sound-button.png"
                    alt="PlacetoPlay"
                  />
                </Box>
              </Grid>
              
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/terms_privacy/">Terms & Privacy</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Contact
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href='mailto:devalamer15@gmail.com'>Nous écrire</Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item>
          <Copyright />
        </Grid>
      </Container>
    </Typography>
  );
}
import { Grid } from '@mui/material'
import React from 'react'
import hero from '/assets/hero/hero.jpg'

export default function HomePage() {
  return (
    <Grid height='500px'>
      <img
        style={{
          width: '100%',
          maxHeight: '100%',
          position: 'center'
        }}
        src={hero}
        alt="sunset view behind a house"
      />
      hello
    </Grid>
  )
}

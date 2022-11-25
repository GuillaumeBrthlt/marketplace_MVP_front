import { Grid } from '@mui/material'
import React from 'react'
import { Hero } from '../components/hero'
import {PropertiesList} from '../components/PropertiesList'


export default function HomePage() {
  return (
    <>
      <Hero />
      <PropertiesList />
    </>
  )
}

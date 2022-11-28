import { Grid } from '@mui/material'
import React from 'react'
import { Hero } from '../components/home/hero'
import { PropertiesList } from '../components/properties/PropertiesList'


export default function HomePage() {
  return (
    <>
      <Hero />
      <PropertiesList />
    </>
  )
}

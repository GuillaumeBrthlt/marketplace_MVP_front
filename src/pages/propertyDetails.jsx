import Typography from '../components/typography'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DetailsSection } from '../components/properties/detailsSection'
import { usePropertyStore } from '../contexts/PropertyContext'
import { Map } from '../components/map/mapForm'
import { Grid } from '@mui/material'

export const PropertyDetails = observer(() => {
  const { id } = useParams()
  const propertyStore = usePropertyStore()

  useEffect(() => {
    propertyStore.setPropertyDetails(id) 
  }, [id])

  useEffect(() => {
    if(propertyStore.propertyDetails.id) {
      propertyStore.setSellerDetails(propertyStore.propertyDetails.attributes.user_id)
    }
  }, [propertyStore.propertyDetails])

  if (propertyStore.sellerDetails.id == null) {
    return (
      <div>Chargement...</div>
    )
  } 

  const property = propertyStore.propertyDetails.attributes
  const seller = propertyStore.sellerDetails
     
  return (
    <>
      <Grid paddingX={{xs: 5, md:20}}>
        <Typography align='center' mb={10} mt={5} gutterBottom marked="center" component="h1" variant='h3'>Details du bien</Typography>
        <DetailsSection property={property} seller={seller} />
      </Grid>
      <Grid display="flex" justifyContent="center" mb={10}>
        <Map property={property}/>
      </Grid>
    </>
  )
})

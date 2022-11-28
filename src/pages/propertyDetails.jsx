import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePropertyStore } from '../contexts/PropertyContext'
import  Map  from '../components/map/mapForm'


export const PropertyDetails = observer(() => {
  const { id } = useParams()
  const propertyStore = usePropertyStore()

  useEffect(() => {
    propertyStore.setPropertyDetails(id) 
  }, [id])

  useEffect(() => {
    if(propertyStore.propertyDetails.id) {
      propertyStore.setSellerDetails(propertyStore.propertyDetails.user_id)
    }
  }, [propertyStore.propertyDetails])

  if (propertyStore.sellerDetails.id == null) {
    return (
      <div>Chargement...</div>
    )
  } 

  const property = propertyStore.propertyDetails
  const seller = propertyStore.sellerDetails
  const mailLink = `mailto:${propertyStore.sellerDetails.email}`
     
  return (
    <>
      <div>Page détails de la propriété <strong>{property.title}</strong> vendu par <strong><a href={mailLink}>{seller.email}</a></strong> au prix de <strong>{property.price} €</strong></div>
      <div><Map/></div>
    </>
  )
})

import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePropertyStore } from '../contexts/PropertyContext'

export const PropertyDetails = observer(() => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [seller, setSeller] = useState(null)
  const propertyStore = usePropertyStore()

  useEffect(() => {
    let findProperty = propertyStore.properties.filter(property => property.id == id)
    setProperty(findProperty[0])
  }, [id])

  useEffect(() => {
    if (property) {
      let findSeller = propertyStore.sellers.filter(seller => property.user_id == seller.id)
      setSeller(findSeller[0])
    }
  }, [property])

  if (propertyStore.loading || seller == null) {
    return (
      <div>Chargement...</div>
    )
  }

  return (
    <div>Page détails de la propriété <strong>{property.title}</strong> vendu par <strong>{seller.email}</strong></div>
  )

})

import { Grid } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Hero } from '../components/home/hero'
import { PropertiesList } from '../components/properties/PropertiesList'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { usePropertyStore } from '../contexts/PropertyContext'

const HomePage = observer(() => {
  const propertyStore = usePropertyStore()
  const [properties, setProperties] = useState(null)
  const [filters, setFilters] = useState([])

  useEffect(() => {
    propertyStore.getProperties()
  }, [])

  useEffect(() => {
    if (propertyStore.properties) {
      setProperties(propertyStore.properties)
    } 
  }, [propertyStore.properties])

  function handleChange(event, value) {
    setFilters(value)
    if (value.length == 0) {
      setProperties(propertyStore.properties)
    } else {
      setProperties(propertyStore.properties.filter(property => value.includes(property.attributes.city)))
    }
  }

  const SearchField = () => {
    return (
      <Autocomplete
      multiple
      value={filters}
      onChange={handleChange}
      id="tags-standard"
      options={propertyStore.cities}
      noOptionsText={'Aucun Résultat'}
      sx={{ width: 400 }}
      renderInput={(params) => <TextField {...params}  label="Ville Recherchée" placeholder="Rechercher" />}
    />
    )
  }
  return (
    <>
      <Hero />
      <Grid display='flex' justifyContent='center' margin={10}>
        {propertyStore.cities ? <SearchField /> : ''}
      </Grid>
      {properties ? <PropertiesList properties={properties}/> : ''}
    </>
  )
})

export default HomePage
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '../button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { usePropertyStore } from '../../contexts/PropertyContext';
import { CardMedia, Grid } from '@mui/material';


export default function PropertyCard({ property }) {
  
  const linkToDetails = `/property/details/${property.id}`
  const linkToEdit = `/property/edit/${property.id}`
  const idThisProperty = property.id
  const propertyStore = usePropertyStore()
  const navigate = useNavigate()



  const deleteThisProperty = () => {
    propertyStore.deleteProperty(idThisProperty)
    navigate('/')

  }


  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  const price = formatter.format(property.price)


  return (
    <Card sx={{ minWidth: 275 }}>
       <CardMedia
          component='img'
          height='300'
          image={property.picture_url ? property.picture_url : 'assets/properties/default.jpg'} 
        />
        <CardContent>
          <Grid display='flex' justifyContent='space-between' flexWrap='wrap'>
            <Grid>
              <Typography variant="h5" component="div" fontWeight='bold'>
                {property.title}
              </Typography>
              <Typography variant="h5" component="div">
                {property.city} ({property.zipcode.toString().slice(0, 2)})
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                {price}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="body2">
                {property.aera} m²
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      <CardActions>
        <Grid display='flex' flexWrap='wrap'>
          <Grid width='100%' textAlign='center' mb={2}>
            <Link to={linkToDetails}>
              <Button size="small">En savoir plus</Button>
            </Link>
          </Grid>
          <Grid display='flex' justifyContent='center' width='100%'>
            <Link to={linkToEdit}>
              <Button variant="contained">Modifier</Button>
            </Link>
            <Button variant="outlined" onClick={deleteThisProperty}>Supprimer</Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
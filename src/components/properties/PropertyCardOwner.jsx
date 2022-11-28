import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '../button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { usePropertyStore } from '../../contexts/PropertyContext';
import { useUserStore } from '../../contexts/UserContext';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

export default function PropertyCard({ property }) {
  const linkToDetails = `/property/details/${property.id}`
  const linkToEdit = `/property/edit/${property.id}`
  const idThisProperty = property.id
  const propertyStore = usePropertyStore()
  const userStore = useUserStore()
  const navigate = useNavigate()


  const deleteThisProperty = () => {
    propertyStore.deleteProperty(idThisProperty)
    navigate('/')
  }


  if(property.user_id == userStore.user.id) {
      return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {property.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {property.price} €
        </Typography>
        <Typography variant="body2">
          {property.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={linkToDetails}>
          <Button size="small">En savoir plus</Button>
        </Link>
        <Link to={linkToEdit}>
          <Button variant="contained">Modifier</Button>
        </Link>
          <Button variant="outlined" onClick={deleteThisProperty}>Supprimer</Button>
      </CardActions>
    </Card>
  )
  }
  return (
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {property.title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {property.price} €
      </Typography>
      <Typography variant="body2">
        {property.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Link to={linkToDetails}>
        <Button size="small">En savoir plus</Button>
      </Link>
    </CardActions>
  </Card>
  )
}
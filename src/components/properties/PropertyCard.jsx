import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '../button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Paper from '../paper';
import {CardMedia, Grid} from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

export default function PropertyCard({ property }) {
  const linkToDetails = `/property/details/${property.id}`

  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });

  const price = formatter.format(property.price)
  

  return (
    
    <Card sx={{ minWidth: 275 }}>
      <Paper
        background="light"
      >
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
          <Link to={linkToDetails} style={{textDecoration: 'none', width: '100%'}}>
            <Button 
              size="small"
              color='secondary'
              fullWidth
            >
              En savoir plus
            </Button>
          </Link>
        </CardActions>
      </Paper>
    </Card>
  )
}

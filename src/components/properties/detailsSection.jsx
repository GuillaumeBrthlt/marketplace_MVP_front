import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Grid
} from '@mui/material';
import { useUserStore } from '../../contexts/UserContext';
import Button from '../button';
import Paper from '../paper';



export const DetailsSection = (props) => {
  const userStore = useUserStore()
  const {property, seller} = props
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
  
  const price = formatter.format(property.price)

  function ContactButton() {
    if (userStore.authenticated) {
      return (
        <Button
          color="secondary"
          fullWidth
          variant="text"
          href={`mailto:${seller.email}`}
        >
          propriétaire: {seller.email}
        </Button>
      )
    } else {
      return (
        <Button
          color="secondary"
          fullWidth
          variant="text"
          disabled
        >
          Vous devez être connecté pour contacter le propriétaire
        </Button>
      )
    }
  }

  return(
    <Card {...props} sx={{marginBottom: '100px'}}>
      <Paper
        background='light'
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Grid alignSelf='center' height={{xs: '300px', md: '500px', xl: '600px'}} mb={10}>
            <img src={property.picture_url ? property.picture_url : '/assets/properties/default.jpg'} style={{height: '100%'}}></img>
            </Grid>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {property.title}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {`${price}`}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              mt={4}
            >
              {property.description}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <ContactButton />
        </CardActions>
      </Paper>
    </Card>
  )
};
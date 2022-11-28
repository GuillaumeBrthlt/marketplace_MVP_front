import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useUserStore } from '../../contexts/UserContext';
import Button from '../button';



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
          Contacter le propriétaire à {seller.email}
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
          Inscrivez-vous pour contacter le propriétaire
        </Button>
      )
    }
  }

  return(
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
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
    </Card>
  )
};
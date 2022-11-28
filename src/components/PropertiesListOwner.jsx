import PropertyCard from './properties/PropertyCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '../components/Typography';
import { observer } from 'mobx-react-lite';
import { usePropertyStore } from '../contexts/PropertyContext'
import { useUserStore } from '../contexts/UserContext'


export const PropertiesListOwner = observer(() => {
  const propertyStore = usePropertyStore()
  const userStore = useUserStore()
  let propertySeller = propertyStore.properties.filter((property) => property.user_id === userStore.user.id)
    const displayCards = propertySeller.map((property) =>{
      return (
        <Grid item xs={2} sm={4} md={4} key={property.id}>
        <PropertyCard property={property} />
      </Grid>
      )
    })

    if(propertySeller.length == 0) {
      return (
        <Typography mt={3} variant="h6" gutterBottom marked="center" align="center">
        Aucune annonce postée pour l'instant !
      </Typography>
      )
    }

    return (

      <Box marginX={{md: 8}} marginY={8}>
        <Grid 
          container
          spacing={{ xs: 6, md: 3 }} 
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {displayCards}
        </Grid>
      </Box>
    )
})

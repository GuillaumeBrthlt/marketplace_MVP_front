import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button';
import Typography from '../typography';
import HeroLayout from './heroLayout';
import Image from '/assets/hero/hero.jpg'
import { observer } from 'mobx-react-lite';
import { useUserStore } from '../../contexts/UserContext';

export const Hero = observer(() => {
  const userStore = useUserStore()

  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${Image})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={Image}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
      Vendez, achetez en toute facilité !
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Chez Real Immo nous vous accompagnons, vendeurs et acheteurs, afin de faciliter la vente et l'acquisition de vos biens immobiliers au travers de notre plateforme. Listez vos bien et trouvez celui de vos rêves en deux clics!
        Ici, pas de frais d'agences ! Les acheteurs entrent directement en contact avec les vendeurs. Inscrivez-vous gratuitement dès à présent !
      </Typography>
      <Link to='/register' style={{textDecoration: 'none'}}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          sx={
            [{ minWidth: 200 },
            userStore.authenticated ? {display: "none"} : '']
          }
        >
          S'inscrire
        </Button>
      </Link>
      
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Commencez dès maintenant
      </Typography>
    </HeroLayout>
  );
})
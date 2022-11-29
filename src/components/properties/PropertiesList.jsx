import React, {useEffect} from 'react'
import { usePropertyStore } from '../../contexts/PropertyContext';
import { useState } from 'react'
import PropertyCard from './PropertyCard'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';

export function PropertiesList({properties}) {


    const displayCards = properties.map((property) =>
      <Grid item xs={2} sm={4} md={4} key={property.id}>
        <PropertyCard property={property.attributes} />
      </Grid>
    )

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
}

import React from 'react'
// import {useState} from 'react'
//import {PropertiesListOwner} from ../components/PropertiesListOwner'

export default function ProfilePage() {
  return (
    <div>Hello</div>
  )
}
/* 
export const ProfilePage = observer(() => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const userStore = useUserStore()
  const propertyStore = usePropertyStore()
 
  const handleSubmit = () => {
	const loginData = {
		“title”: title,
		“price”: price,
		“description”: description,
		“user_id”: userStore.user.id
	   }
	propertyStore.createProperty()
	};


  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Enregistrer votre annonce
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <div type="input" onChange={e => setTitle(e.target.value)}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="title"
                  autoComplete="title"
                  label="Titre de votre annonce"
                  margin="normal"
                />
              </div>
              <div type="input" onChange={e => setPrice(e.target.value)}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="price"
                  autoComplete="price"
                  label="Prix de votre bien"
                  margin="normal"
                />
              </div>              
              <div type="input" onChange={e => setDescription(e.target.value)}>
                <Field
                  fullWidth
                  multiline
                  rows={5}
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="description"
                  autoComplete="description"
                  label="Description"
                  margin="normal"
                />
              </div>
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting ? 'En cours…' : "Confirmer"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
    <React.Fragment>
      <Typography mt={3} variant="h3" gutterBottom marked="center" align="center">
        La liste de vos annonces:
      </Typography>
      {if(propertyStore.properties.length != 0) {
        <PropertiesListOwner />
        else {
          <Typography mt={2} variant="h6" gutterBottom marked="center" align="center">
        Vous n'avez encore aucune annonce postée !
      </Typography>
        }
      }}
    
    </React.Fragment>
  )
} 

*********** in PropertiesListOwner.jsx (new file to add) *************

import PropertyCard from './PropertyCard'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { observer } from 'mobx-react-lite';

export const PropertiesListOwner = observer(() => {
  const propertyStore = usePropertyStore()
  const userStore = useUserStore()


    const displayCards = propertyStore.properties.map((property) =>
    if (property.user_id == userStore.user.id) {
    <Grid item xs={2} sm={4} md={4} key={property.id}>
        <PropertyCard property={property} />
      </Grid>
    })

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
*/
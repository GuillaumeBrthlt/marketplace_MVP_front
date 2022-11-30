import React, {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {useState} from 'react'
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import {required} from '../components/form/validation'
import AppForm from '../components/form/appForm'
import Typography from '../components/typography';
import RFTextField from '../components/form/RFTextField';
import TextField from '../components/textField';
import FormButton from '../components/form/FormButton';
import { usePropertyStore } from '../contexts/PropertyContext'


export const EditPropertyPage = observer(() => {
  const propertyStore = usePropertyStore()
  const [furnished, setFurnished] = useState(null)
  const [basement, setBasement] = useState(null)
  const [outside, setOutside] = useState(null)
  const [carPark, setCarPark] = useState(null)
  const navigate = useNavigate()
  const {id} = useParams()


  useEffect(() => {
    propertyStore.setPropertyDetails(id) 
  }, [id])

  const handleSubmit = (e) => {

    const editData = {
      title: e.title,
      description: e.description,
      address: e.address,
      zipcode: parseInt(e.zipcode),
      city: e.city,
      aera: parseInt(e.aera),
      rooms: parseInt(e.rooms),
      basement: basement != null ? basement : propertyStore.propertyDetails.attributes.basement,
      furnished: furnished  != null ? furnished : propertyStore.propertyDetails.attributes.furnished,
      has_outside: outside != null ? outside : propertyStore.propertyDetails.attributes.has_outside,
      car_park: carPark != null ? carPark : propertyStore.propertyDetails.attributes.car_park
    }
  
    propertyStore.editProperty(editData, id)
    navigate("/dashboard");
	};


  const formOptions = [
    { value: true , name: 'Oui', code: 'true' },
    { value: false, name: 'Non', code: 'false' }
  ]
  
  const validate = (values) => {
    const errors = required(['title', 'price', 'description', 'address',
                          'city', 'zipcode', 'aera', 'rooms'], values);

    if (!errors.title || !errors.price || !errors.description ||
        !errors.address || !errors.city || !errors.zipcode || !errors.aera ||
        !errors.rooms) {
      return (errors)
    }

    return errors;
  }; 

  if (!propertyStore.propertyDetails.id) {
    return (
      <div>Chargement...</div>
    )
  } 


  const handleFurnished = (e) => {
    setFurnished(e.target.value)
  }

  const handleOutside = (e) => {
    setOutside(e.target.value)
  }

  const handleBasement = (e) => {
    setBasement(e.target.value)
  }

  const handleCarPark = (e) => {
    setCarPark(e.target.value)
  }


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

                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  defaultValue={propertyStore.propertyDetails.attributes.title}
                  name="title"
                  autoComplete="title"
                  label="Titre de votre annonce"
                  margin="normal"
                />
              
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  defaultValue={propertyStore.propertyDetails.attributes.price.toString()}
                  name="price"
                  autoComplete="price"
                  label="Prix de votre bien"
                  margin="normal"
                />
              
                <Field
                  fullWidth
                  multiline
                  rows={5}
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  defaultValue={propertyStore.propertyDetails.attributes.description}
                  name="description"
                  autoComplete="description"
                  label="Description"
                  margin="normal"
                />
              
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  defaultValue={propertyStore.propertyDetails.attributes.address}
                  name="address"
                  autoComplete="123 abc street"
                  label="Adresse du bien"
                  margin="normal"
                />
              
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  defaultValue={propertyStore.propertyDetails.attributes.city}
                  name="city"
                  autoComplete="ville"
                  label="Ville de votre bien"
                  margin="normal"
                />

                <Field
                  fullWidth
                  type="number"
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  defaultValue={propertyStore.propertyDetails.attributes.zipcode.toString()}
                  name="zipcode"
                  autoComplete="75000"
                  label="Code postal"
                  margin="normal"
                />
 
                <Field
                  fullWidth
                  type="number"
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  defaultValue={propertyStore.propertyDetails.attributes.aera.toString()}
                  name="aera"
                  autoComplete="50"
                  label="Surface en m²"
                  margin="normal"
                />

                <Field
                  fullWidth
                  type="number"
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  defaultValue={propertyStore.propertyDetails.attributes.rooms.toString()}
                  name="rooms"
                  autoComplete="4"
                  label="Nombre de pièces"
                  margin="normal"
                />
 
                <TextField
                  select
                  fullWidth
                  size="medium"
                  variant="standard"
                  onChange={handleFurnished}
                  value={furnished ? furnished : propertyStore.propertyDetails.attributes.furnished}
                  name="furnished"
                  label="Meublé ?"
                  SelectProps={{
                    native: true,
                  }}
                  sx={{ mt: 1, width: 150 }}
                >
                  {formOptions.map((option) => (
                    <option value={option.value} key={option.code}>
                      {option.name}
                    </option>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  size="medium"
                  variant="standard"
                  onChange={handleCarPark}
                  value={carPark ? carPark : propertyStore.propertyDetails.attributes.car_park}
                  name="carPark"
                  label="Parking ?"
                  SelectProps={{
                    native: true,
                  }}
                  sx={{ mt: 1, width: 150 }}
                >
                  {formOptions.map((option) => (
                    <option value={option.value} key={option.code}>
                      {option.name}
                    </option>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  size="medium"
                  variant="standard"
                  onChange={handleOutside}
                  value={outside ? outside : propertyStore.propertyDetails.attributes.has_outside}
                  name="outside"
                  label="Jardin/balcon/terrasse ?"
                  SelectProps={{
                    native: true,
                  }}
                  sx={{ mt: 1, width: 150 }}
                >
                  {formOptions.map((option) => (
                    <option value={option.value} key={option.code}>
                      {option.name}
                    </option>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  size="medium"
                  variant="standard"
                  onChange={handleBasement}
                  value={basement ? basement : propertyStore.propertyDetails.attributes.basement}
                  name="basement"
                  label="Sous-sol ?"
                  SelectProps={{
                    native: true,
                  }}
                  sx={{ mt: 1, width: 150 }}
                >
                  {formOptions.map((option) => (
                    <option value={option.value} key={option.code}>
                      {option.name}
                    </option>
                  ))}
                </TextField>

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
  )
})

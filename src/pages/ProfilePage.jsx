import React from 'react'
import {useNavigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {useState} from 'react'
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Button from '../components/button';
import {required} from '../components/form/validation'
import AppForm from '../components/form/appForm'
import Typography from '../components/typography';
import RFTextField from '../components/form/RFTextField';
import { PropertiesListOwner } from '../components/properties/PropertiesListOwner';
import FormButton from '../components/form/FormButton';
import { usePropertyStore } from '../contexts/PropertyContext'
import RFUploadField from '../components/form/RFUploadField';
import TextField from '../components/textField';
import './ProfilePage.css'
import { imageResize } from '../components/modules/Resizer';

export const ProfilePage = observer(() => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const propertyStore = usePropertyStore()
  const [picture, setPicture] = useState(undefined)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipcode, setZipcode] = useState(0)
  const [aera, setAera] = useState(0)
  const [rooms, setRooms] = useState(0)
  const [furnished, setFurnished] = useState(true)
  const [carPark, setCarPark] = useState(true)
  const [outside, setOutside] = useState(true)
  const [basement, setBasement] = useState(true)
  const navigate = useNavigate()


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

  const handleSubmit = () => {
    const data = new FormData()
    data.append("property[title]", title)
    data.append("property[price]", price)
    data.append("property[description]", description)
    if (picture) {
      console.log(picture)
      data.append("property[picture]", picture)
    }
    data.append("property[address]", address)
    data.append("property[city]", city)
    data.append("property[zipcode]", zipcode)
    data.append("property[aera]", aera)
    data.append("property[rooms]", rooms)
    data.append("property[furnished]", furnished)
    data.append("property[car_park]", carPark)
    data.append("property[has_outside]", outside)
    data.append("property[basement]", basement)
    propertyStore.createProperty(data)
    navigate('/')
	};


  const handlePicture = async (event) => {  
    try {
      const file = event.target.files[0];
      const resized = await imageResize(file)
      setPicture(resized)
    } catch(error) {
      console.log(error)
    }
  }     

  const toggleForm = () => {
    var buttonForm = document.getElementById("form")
    buttonForm.className.includes('hidden') ? buttonForm.classList.remove('hidden') : buttonForm.classList.add('hidden')
  }

  return (
    <React.Fragment>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button sx={{mt: 5 }}  variant="contained"  onClick={toggleForm} id="button">Afficher / Cacher formulaire de création</Button>
      </Box>
        <div className="hidden" id="form">
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
              <div type="input" onChange={e => setAddress(e.target.value)}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="address"
                  autoComplete="123 abc street"
                  label="Adresse du bien"
                  margin="normal"
                />
              </div>
              <div type="input" onChange={e => setCity(e.target.value.toUpperCase().split(' ').join('-'))}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="city"
                  autoComplete="ville"
                  label="Ville de votre bien"
                  margin="normal"
                />
              </div>
              <div type="input" onChange={e => setZipcode(e.target.value)}>
                <Field
                  fullWidth
                  type="number"
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="zipcode"
                  autoComplete="75000"
                  label="Code postal"
                  margin="normal"
                />
              </div>
              <div type="input" onChange={e => setAera(e.target.value)}>
                <Field
                  fullWidth
                  type="number"
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="aera"
                  autoComplete="50"
                  label="Surface en m²"
                  margin="normal"
                />
              </div>
              <div type="input" onChange={e => setRooms(e.target.value)}>
                <Field
                  fullWidth
                  type="number"
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="rooms"
                  autoComplete="4"
                  label="Nombre de pièces"
                  margin="normal"
                />
              </div>
              <div type="input" onChange={e => setFurnished(e.target.value)}>
                <TextField
                  select
                  fullWidth
                  size="medium"
                  variant="standard"
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
              </div>
              <div type="input" onChange={e => setCarPark(e.target.value)}>
                <TextField
                  select
                  fullWidth
                  size="medium"
                  variant="standard"
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
              </div>
              <div type="input" onChange={e => setOutside(e.target.value)}>
                <TextField
                  select
                  fullWidth
                  size="medium"
                  variant="standard"
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
              </div>
              <div type="input" onChange={e => setBasement(e.target.value)}>
                <TextField
                  select
                  fullWidth
                  size="medium"
                  variant="standard"
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
              </div>
              <div type="input" onChange={handlePicture}>
                <Field
                  fullWidth
                  size='large'
                  type='file'
                  component={RFUploadField}
                  disabled={submitting}
                  name='picture'
                  label='photo'
                  margin='normal'
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
      </div>

      <Typography mt={3} variant="h3" gutterBottom marked="center" align="center" sx={{ mt: 3}}>
        La liste de vos annonces:
      </Typography>
        <PropertiesListOwner />   
    </React.Fragment>
  )
})

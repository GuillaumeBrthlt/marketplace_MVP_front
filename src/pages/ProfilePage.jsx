import React from 'react'
import { observer } from 'mobx-react-lite'
import {useState} from 'react'
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import {required} from '../components/form/validation'
import AppForm from '../components/form/appForm'
import Typography from '../components/Typography';
import RFTextField from '../components/form/RFTextField';
import { PropertiesListOwner } from '../components/PropertiesListOwner';
import FormButton from '../components/form/FormButton';
import { usePropertyStore } from '../contexts/PropertyContext'
import { useUserStore } from '../contexts/UserContext'

export const ProfilePage = observer(() => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const userStore = useUserStore()
  const propertyStore = usePropertyStore()

  const validate = (values) => {
    const errors = required(['title', 'price', 'description'], values);

    if (!errors.title || !errors.price || !errors.description) {
      return (errors)
    }
/*     if (errors.price.typeof() === String) {
      return "il faut des chiffres"
    } */
    return errors;
  }; 

  const handleSubmit = () => {
	const loginData = {
	'title': title,
	'price': price,
	'description': description,
	  }
	propertyStore.createProperty(loginData)
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
      <Typography mt={3} variant="h3" gutterBottom marked="center" align="center">
        La liste de vos annonces:
      </Typography>
        <PropertiesListOwner />   
    </React.Fragment>
  )
})
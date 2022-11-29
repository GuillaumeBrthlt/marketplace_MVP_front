import React, {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {useState} from 'react'
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import {required} from '../components/form/validation'
import AppForm from '../components/form/appForm'
import Typography from '../components/Typography';
import RFTextField from '../components/form/RFTextField';
import FormButton from '../components/form/FormButton';
import { usePropertyStore } from '../contexts/PropertyContext'
import { useUserStore } from '../contexts/UserContext'

export const EditPropertyPage = observer(() => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const userStore = useUserStore()
  const propertyStore = usePropertyStore()
  const property = propertyStore.propertyDetails
  const navigate = useNavigate()
  const {id} = useParams()
/* 
  const validate = (values) => {
    const errors = required(['title', 'price', 'description'], values);

    if (!errors.title || !errors.price || !errors.description) {
      return (errors)
    }
    return errors;
  }; 
 */

  useEffect(() => {
    propertyStore.setPropertyDetails(id) 
  }, [id])

  const handleSubmit = () => {
	const loginData = {
	'title': title,
	'price': price,
	'description': description,
	}
	propertyStore.editProperty(loginData, id)
  navigate("/");
	};

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Modifier votre annonce
          </Typography>          
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
//          validate={validate}
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
  )
})
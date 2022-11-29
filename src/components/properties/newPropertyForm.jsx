import React from 'react'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Typography from '../Typography';
import AppForm from '../components/appForm';
import { required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';

export const NewPropertyForm = observer(() => {
  const [title, setTitle] = useState(null)
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState(null)

  const validate = (values) => {
    const errors = required(['title', 'price', 'description'], values);
    return errors;
  }; 

  const handleSubmit = () => {
    const propertyData = {
      "Title": title,
      "price": price,
      "description": description
    };
    propertyStore.createProperty(propertyData)
  };

  // useEffect(() => {
  //   userStore.authenticated ? navigate('/') : '';
  // }, [userStore.authenticated])

  return (
    <React.Fragment>
      <Typography sx={propertyStore.hasErrors ? '' : {display: 'none'}}>
        Verifiez les informations.
      </Typography>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Ajouter un bien immobilier.
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
                  autoComplete="title"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting }
                  fullWidth
                  label="Title"
                  margin="normal"
                  name="Title"
                  required
                  size="large"
                />
               </div>
               <div type="input" onChange={e => setPrice(e.target.value)}>
                <Field
                  autoComplete="price"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting }
                  fullWidth
                  label="Price"
                  margin="normal"
                  name="Price"
                  required
                  size="large"
                />
               </div>
               <div type="input" onChange={e => setDescription(e.target.value)}>
                <Field
                  autoComplete="price"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting }
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="Description"
                  required
                  size="large"
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
                {submitting ? 'En cours…' : "Ajouter"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  )
})
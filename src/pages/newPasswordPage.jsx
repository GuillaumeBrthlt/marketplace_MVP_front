import React from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Typography from '../components/typography';
import AppForm from '../components/form/appForm';
import { required } from '../components/form/validation';
import RFTextField from '../components/form/RFTextField';
import FormButton from '../components/form/FormButton';
import FormFeedback from '../components/form/FormFeedback';
import axios from 'axios';

export default function NewPasswordPage() {
  const [password, setPassword] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const BASE_URL = 'https://dev-marketplace-api-immo.fly.dev/'
  const token = searchParams.get('reset_token')

  const validate = (values) => {
    const errors = required(['password', 'password-confirmation'], values);
    return errors;
  }; 

  async function handleSubmit() {
    if (password !== passwordConfirmation) {
      return (
        <p>Les mots de passe ne sont pas identiques</p>
      )
    } else {
      let payload = {
        "user": {
          "password": password,
          "password_confirmation": passwordConfirmation,
          "reset_password_token": token
        }
      }
      try {
        axios.put(`${BASE_URL}users/password`, payload)
      } catch(error) {
        console.error(error)
      }
      navigate('/login')
    }
  }

  if (!token) {
    return (
      <div>
        <p>Nous n'avons pas trouvé cette adresse.</p>
      </div>
    )
  }

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Choisir un nouveau mot de passe
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <div type="input" onChange={e => setPassword(e.target.value)}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Mot de passe"
                  type="password"
                  margin="normal"
                />
              </div>
              <div type="input" onChange={e => setPasswordConfirmation(e.target.value)}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting}
                  required
                  name="password-confirmation"
                  autoComplete="current-password"
                  label="Confirmation du mot de passe"
                  type="password"
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
}
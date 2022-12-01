import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Typography from '../components/typography';
import AppForm from '../components/form/appForm';
import { emailVerif, required } from '../components/form/validation';
import RFTextField from '../components/form/RFTextField';
import FormButton from '../components/form/FormButton';
import FormFeedback from '../components/form/FormFeedback';
import axios from 'axios';

export default function ResetPasswordPage() {
  const BASE_URL = 'https://dev-marketplace-api-immo.fly.dev/'
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()

  const validate = (values) => {
    const errors = required(['email'], values);

    if (!errors.email) {
      const emailError = emailVerif(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    return errors;
  }; 

  async function handleSubmit() {
    let payload = {
      "user": {
        "email": email
      }
    }
    try {
      axios.post(`${BASE_URL}users/password`, payload)
    } catch (error) {
      console.error(error)
    }
    navigate('/')
  }

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Vous avez oublié votre mot de passe ?
          </Typography>
          <Typography variant="body2" align="center">
            {'Pas encore membre ? '}
            <Link
              to="/register"
              align="center"
              underline="always"
            >
              S'inscrire
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <div type="input" onChange={e => setEmail(e.target.value)}>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting }
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
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
                {submitting ? 'En cours…' : "Envoyer email de récupération"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  )
}
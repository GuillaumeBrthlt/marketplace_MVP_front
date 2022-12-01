import React from 'react'
import { useState, useEffect } from 'react'
import { useUserStore } from '../contexts/UserContext'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Typography from '../components/typography';
import AppForm from '../components/form/appForm';
import { emailVerif, required } from '../components/form/validation';
import RFTextField from '../components/form/RFTextField';
import FormButton from '../components/form/FormButton';
import FormFeedback from '../components/form/FormFeedback';

export const RegisterPage = observer(() => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState(null)
  const userStore = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    userStore.authenticated ? navigate('/dashboard') : '';
  }, [userStore.authenticated])

  const validate = (values) => {
    const errors = required(['email', 'password', 'password-confirmation'], values);

    if (!errors.email) {
      const emailError = emailVerif(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    return errors;
  }; 
  
  function handleSubmit () {
    if (password === passwordConfirmation) {
      const registerData = {
        "user": {
          "email": email,
          "password": password,
          "password_confirmation": passwordConfirmation
        }
      };
      userStore.register(registerData)
    } else {
      return (
        <div>
          Les mots de passes ne correspondent pas.
        </div>
      )
    }
  }

  return (
    <React.Fragment>
      <Typography sx={userStore.hasErrors ? '' : {display: 'none'}} align='center' color="red">
        Email ou mot de passe invalide.
      </Typography>
      <AppForm >
        <React.Fragment>
          <div data-cy="connection-title">
          <Typography variant="h3" gutterBottom marked="center" align="center" >
            S'enregistrer
          </Typography>
          </div>

          <Typography variant="body2" align="center">
            {'Déja membre ? '}
            <Link
              to="/login"
              align="center"
              underline="always"
            >
              Se connecter
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
                  data-cy="password"
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
                data-cy="signInBtn"
              >
                {submitting ? 'En cours…' : "S'inscrire"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  )
})
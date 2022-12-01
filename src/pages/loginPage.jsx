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

export const LoginPage = observer(() => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const userStore = useUserStore()
  const navigate = useNavigate()

  useEffect(() => {
    userStore.authenticated ? navigate('/') : '';
  }, [userStore.authenticated])
  
  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = emailVerif(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
    return errors;
  }; 

  const handleSubmit = () => {
    const loginData = {
      "user": {
        "email": email,
        "password": password
      }
    };
    userStore.loginUser(loginData)
  };

  return (
    <React.Fragment>
      <Typography sx={userStore.hasErrors ? '' : {display: 'none'}}>
        Email ou mot de passe invalide.
      </Typography>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Se connecter
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
                {submitting ? 'En cours…' : "Se connecter"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" to='/resetpassword'>
            Mot de passe oublié?
          </Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  )
})
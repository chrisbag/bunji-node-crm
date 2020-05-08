import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import { register } from 'src/actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

function RegisterForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        prenom: '',
        nom: '',
        email: '',
        password: '',
        telephone: '',
        policy: false,
        active: false
      }}
      validationSchema={Yup.object().shape({
        prenom: Yup.string()
          .max(255)
          .required('First name is required'),
        nom: Yup.string()
          .max(255)
          .required('Last name is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string()
          .min(7)
          .max(255)
          .required('Password is required'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await dispatch(register(values));
          onSubmitSuccess();
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.prenom && errors.prenom)}
            fullWidth
            helperText={touched.prenom && errors.prenom}
            label="Prénom"
            margin="normal"
            name="prenom"
            onBlur={handleBlur}
            onChange={handleChange}
            type="prenom"
            value={values.prenom}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.nom && errors.nom)}
            fullWidth
            helperText={touched.nom && errors.nom}
            label="Nom"
            margin="normal"
            name="nom"
            onBlur={handleBlur}
            onChange={handleChange}
            type="nom"
            value={values.nom}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Mot de passe"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.telephone && errors.telephone)}
            fullWidth
            helperText={touched.telephone && errors.telephone}
            label="Téléphone"
            margin="normal"
            name="telephone"
            onBlur={handleBlur}
            onChange={handleChange}
            type="telephone"
            value={values.telephone}
            variant="outlined"
          />

          <Box alignItems="center" display="flex" mt={2} ml={-1}>
            <Checkbox
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography variant="body2" color="textSecondary">
              Vous confirmez avoir lu et accepté notre{' '}
              <Link component="a" href="#" color="secondary">
                Politique de Confidentialité
              </Link>{' '}
              et nos{' '}
              <Link component="a" href="#" color="secondary">
                CGU
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>{errors.policy}</FormHelperText>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Essayez Gratuitement
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => {}
};

export default RegisterForm;

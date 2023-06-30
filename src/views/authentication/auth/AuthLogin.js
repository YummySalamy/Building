import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      const url = 'https://users-test-xcdhbgn6qa-uc.a.run.app/users/login/';
  
      const loginData = {
        email: email,
        password: password,
      };
  
      const response = await axios.post(url, loginData);
  
      if (response.status === 200 && response.data.token) {
        console.log('Inicio de sesión exitoso:', response.data);
        const userData = {
          email: email,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate('/app');
      } else {
        setError('Error en los datos de inicio de sesión. Verifica tu usuario y contraseña.');
      }
    } catch (error) {
      console.log('Error de red:', error);
      setError('Ocurrió un error en el inicio de sesión. Inténtalo de nuevo más tarde.');
    }
  };
    
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          Ingresar
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
            Usuario o Correo
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mt="25px">
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
            Contraseña
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <Typography
            component={Link}
            to="#"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Olvidaste la contraseña?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin} // Llama a la función handleLogin al hacer clic en el botón
        >
          Ingresar
        </Button>
      </Box>
      <Box mt={2} display="flex" alignItems="center" justifyContent="center">
        <Button
          variant="outlined"
          startIcon={<FaGoogle />}
          size="large"
          fullWidth
          component={Link}
          to="#"
          type="submit"
        >
          Ingresar con Google
        </Button>
      </Box>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {subtitle}
    </>
  );
};

export default AuthLogin;

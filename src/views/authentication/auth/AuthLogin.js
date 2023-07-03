import React, { useState, useEffect } from 'react';
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
import refreshToken from './RefreshToken';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const token = localStorage.getItem('token');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      
      if (!token || !storedRefreshToken) {
        // Redirigir a la página de inicio de sesión si no hay un token o refreshToken almacenados
        navigate('/');
        return;
      }

      try {
        // Verificar la vigencia del token enviando una solicitud de prueba
        const testUrl = 'https://users-test-xcdhbgn6qa-uc.a.run.app/users/test';
        const response = await axios.get(testUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // El token aún es válido, continuar con la aplicación
          navigate('/app');
        }
      } catch (error) {
        // El token ha expirado, renovarlo automáticamente
        try {
          const newToken = await refreshToken();
          // Realizar cualquier acción adicional necesaria, como actualizar el estado de la aplicación
          // con el nuevo token.
        } catch (error) {
          console.log('Error al renovar el token:', error);
          // Redirigir a la página de inicio de sesión si no se puede renovar el token
          navigate('/login');
        }
      }
    };

  checkTokenExpiration();
}, [navigate]);
  
  const handleLogin = async () => {
    try {
      const url = 'https://users-test-xcdhbgn6qa-uc.a.run.app/users/login/';
  
      const loginData = {
        email: email,
        password: password,
      };
  
      const response = await axios.post(url, loginData);
  
      if (response.status === 200 && response.data.token && response.data.refresh_token) {
        console.log('Inicio de sesión exitoso:', response.data);
        const token = response.data.token;
        const refreshToken = response.data.refresh_token;
        
        // Almacena el token y el refresh token en localStorage o en el estado de la aplicación, según tu preferencia.
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        
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

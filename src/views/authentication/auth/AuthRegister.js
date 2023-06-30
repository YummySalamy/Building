import React, { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import {signup} from './Signup'

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !phoneNumber) {
      setError('Todos los campos son obligatorios.');
    } else {
      try {
        const response = await signup(email, password, name, phoneNumber);
        console.log(response); // Procesa la respuesta del backend, por ejemplo, muestra un mensaje de éxito o redirecciona a otra página
        // Realiza acciones adicionales después del registro exitoso, como mostrar un mensaje de éxito o redireccionar a otra página
      } catch (error) {
        console.error(error); // Maneja el error, por ejemplo, muestra un mensaje de error o realiza alguna acción apropiada
        // Realiza acciones adicionales en caso de error, como mostrar un mensaje de error o realizar alguna acción apropiada
      }
    }
  };
  

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          Registro
        </Typography>
      )}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
            Nombre
          </Typography>
          <CustomTextField id="name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
            Correo Electrónico
          </Typography>
          <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
            Contraseña
          </Typography>
          <CustomTextField id="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="phoneNumber" mb="5px" mt="25px">
            Número de Teléfono
          </Typography>
          <CustomTextField id="phoneNumber" variant="outlined" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}

        <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister}>
          Registrarse
        </Button>
      </Box>

      {subtitle}
    </>
  );
};

export default AuthRegister;

import React, { useState } from 'react';
import { message, Button } from 'antd'; // Importa el Button de 'antd' en lugar de IconButton
import { Box, Typography, Alert } from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

import { signup } from './Signup';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !phoneNumber) {
      setError('Todos los campos son obligatorios.');
    } else {
      try {
        const response = await signup(email, password, name, phoneNumber);
        console.log(response);
        message.success('Usuario creado con éxito, redirigiendo a inicio de sesión.');
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 3000);
      } catch (error) {
        console.error(error);
        message.error('Algo salió mal con el registro...');
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
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  shape="circle"
                  size="small"
                />
              ),
            }}
          />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="phoneNumber" mb="5px" mt="25px">
            Número de Teléfono
          </Typography>
          <CustomTextField
            id="phoneNumber"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Stack>

        {error && <Alert severity="error">{error}</Alert>}

        <Button type="primary" size="large" block onClick={handleRegister}>
          Registrarse
        </Button>
      </Box>

      {subtitle}
    </>
  );
};

export default AuthRegister;

import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';
import { FaGoogle } from 'react-icons/fa';

// components
import PageContainer from 'src/components/container/PageContainer';
import AuthLogin from './auth/AuthLogin';

const Login2 = () => {
  return (
    <PageContainer title="Login" description="This is the Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
              </Box>
              <AuthLogin
                title="Sign In"
                subtitle={
                  <>
                    <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                      <Typography
                        component={Link}
                        to="/auth/register"
                        fontWeight="500"
                        sx={{
                          textDecoration: 'none',
                          color: 'primary.main',
                        }}
                      >
                        Crear una cuenta
                      </Typography>
                    </Stack>
                  </>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;

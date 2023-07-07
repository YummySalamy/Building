import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import LoginButton from './components/LoginButton';
import SignupButton from './components/SignupButton';

const LandingPage = () => {
  return (
    <PageContainer title="LandingPage" description="This is the landing page">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <LoginButton/>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SignupButton />
              </Grid>
              <Grid item xs={12}>
                <SignupButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default LandingPage;
import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import ChatHistory from './components/ChatHistory';
import TokensWidget from './components/TokensWidget';
import MonthlyUsage from './components/MonthlyUsage';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="This is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ChatHistory/>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TokensWidget />
              </Grid>
              <Grid item xs={12}>
                <MonthlyUsage />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;

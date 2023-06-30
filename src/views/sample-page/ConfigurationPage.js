import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const ConfigurationPage = () => {
  return (
    <DashboardCard>
      <PageContainer>
        <Typography variant="h1">Pestaña de configuración</Typography>
      </PageContainer>
    </DashboardCard>
  );
};

export default ConfigurationPage;


import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Profiletest = () => {
  return (
    <PageContainer title="configuracion" description="this is the config page">

      <DashboardCard title="Configuración">
        <Typography>Pestaña de perfil</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Profiletest;
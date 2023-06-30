import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const userData = JSON.parse(localStorage.getItem('userData'));

const ProfilePage = () => {
  return (
    <DashboardCard>
      <PageContainer>
        <Typography variant="h1">Perfil de Usuario</Typography>
        {userData && (
          <div>
            <p>Nombre: </p>
            <p>Email: {userData.email}</p>
            <p>Numero de telefono: </p>
            {/* Mostrar otros datos del usuario según sea necesario */}
          </div>
        )}
      </PageContainer>
    </DashboardCard>
  );
};

export default ProfilePage;
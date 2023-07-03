import axios from 'axios';

const refreshToken = async () => {
    try {
      const url = 'https://users-test-xcdhbgn6qa-uc.a.run.app/users/refresh_token';
      const refreshToken = localStorage.getItem('refreshToken');
  
      const response = await axios.post(url, { refresh_token: refreshToken });
      if (response.status === 200 && response.data.token) {
        const newToken = response.data.token;
        // Actualizar el token en localStorage o en el estado de la aplicación, según tu preferencia.
        localStorage.setItem('token', newToken);
        return newToken;
      }
      throw new Error('No se pudo renovar el token');
    } catch (error) {
      throw new Error('No se pudo renovar el token');
    }
  };  

export default refreshToken;

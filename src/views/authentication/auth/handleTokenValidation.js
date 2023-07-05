import refreshToken from './RefreshToken';
import { message } from 'antd'

const handleTokenValidation = async (error, action, attempts) => {
    if (error.response && error.response.status === 401 && attempts < 4) {
        try {
            // Intentar refrescar el token
            const newToken = await refreshToken();

            // Actualizar el token en el almacenamiento local y volver a intentar la acción original
            localStorage.setItem('token', newToken);
            await action();
        } catch (refreshError) {
            // Error al refrescar el token, mostrar el mensaje de error y redirigir al usuario a la página de inicio
            console.log('Error al refrescar el token');
            message.error('Por favor, autenticate de nuevo...')
            setTimeout(() => {
                window.location.href = '/';
              }, 3000);
        }
    } else {
        message.error('Algo salió mal... por favor, autenticate de nuevo.')
        setTimeout(() => {
            window.location.href = '/';
          }, 3000);
    }
};

export default handleTokenValidation;
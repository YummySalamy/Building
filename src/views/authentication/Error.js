import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorImg from 'src/assets/images/backgrounds/404-error-idea.gif';

const Error = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
  >
    <Container maxWidth="md">
      <img src={ErrorImg} alt="404" style={{ width: '100%', maxWidth: '500px' }} />
      <Typography align="center" variant="h1" mb={4}>
        Opps!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        Esta pagina que buscas, aun no existe, regresa luego.
      </Typography>
      <Button color="primary" variant="contained" component={Link} to="/auth/login" disableElevation>
        Regresar
      </Button>
    </Container>
  </Box>
);

export default Error;

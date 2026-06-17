import { Typography, Container } from '@mui/material';

export default function Profile() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Profil Użytkownika i Statystyki
      </Typography>
    </Container>
  );
}
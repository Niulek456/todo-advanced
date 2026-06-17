import { Typography, Container } from '@mui/material';

export default function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Lista Zadań (Dashboard)
      </Typography>
      <p>Tutaj pojawi się nasza zaawansowana lista zadań.</p>
    </Container>
  );
}
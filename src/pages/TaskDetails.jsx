import { Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function TaskDetails() {
  const { id } = useParams();
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        Szczegóły Zadania ID: {id}
      </Typography>
    </Container>
  );
}
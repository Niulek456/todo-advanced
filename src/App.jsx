import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';
import { TodoProvider } from './context/TodoContext';

// Tworzymy nowoczesny, spójny design (Design System)
const theme = createTheme({
  palette: {
    primary: { main: '#4f46e5' }, // Nowoczesny fiolet (Indygo)
    secondary: { main: '#ec4899' }, // Akcentujący róż
    background: { default: '#f8fafc', paper: '#ffffff' }, // Delikatnie szare tło aplikacji, białe karty
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12, // Przyjemne, zaokrąglone rogi we wszystkich elementach
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 }, // Wyłączenie wielkich liter w przyciskach
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Resetuje domyślne style przeglądarki i ustawia kolor tła */}
      <TodoProvider>
        <Router>
          <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid #e2e8f0', bgcolor: 'white', color: 'text.primary' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
                TaskMind.
              </Typography>
              <Button color="inherit" component={Link} to="/">Dashboard</Button>
              <Button color="inherit" component={Link} to="/profile">Profil</Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task/:id" element={<TaskDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Container>
        </Router>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
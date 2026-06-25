import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, ThemeProvider, createTheme, CssBaseline, Snackbar, Alert, Box, Fade } from '@mui/material';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import Profile from './pages/Profile';
import { TodoProvider, useTodos } from './context/TodoContext';

const theme = createTheme({
  palette: {
    primary: { main: '#1a1a1a', light: '#333333', dark: '#000000' },
    secondary: { main: '#f1f5f9' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    text: { primary: '#1a1a1a', secondary: '#64748b' },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h4: { fontWeight: 900, letterSpacing: '-0.04em' },
    h5: { fontWeight: 800, letterSpacing: '-0.03em' },
  },
  shape: {
    borderRadius: 24, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 700, borderRadius: 16 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12 }, 
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { backgroundColor: '#ffffff', padding: '0 4px' }, 
      },
    },
  },
});

function AppContent() {
  const { notification, handleCloseNotification } = useTodos();
  const location = useLocation();

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', color: 'text.primary' }}>
        <Toolbar sx={{ height: 80, px: { xs: 2, sm: 4, md: 6 } }}> 
          {/* POPRAWKA 1: Wymuszenie tekstu do lewej (textAlign: 'left') */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#1a1a1a', fontWeight: 900, textAlign: 'left' }}>
            TaskMind.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            
            {/* POPRAWKA 2: Duże, czarne pastylki (większe paddingi px, py i borderRadius 100px) */}
            <Button 
              component={NavLink} 
              to="/" 
              disableElevation
              sx={{ 
                px: 3, 
                py: 1.2, 
                borderRadius: '100px',
                fontSize: '0.95rem',
                color: 'text.secondary', 
                '&.active': { bgcolor: 'primary.main', color: 'white' },
                '&:hover:not(.active)': { bgcolor: '#f1f5f9', color: 'primary.main' }
              }}
            >
              Ekran Główny
            </Button>

            <Button 
              component={NavLink} 
              to="/profile" 
              disableElevation
              sx={{ 
                px: 3, 
                py: 1.2, 
                borderRadius: '100px',
                fontSize: '0.95rem',
                color: 'text.secondary', 
                '&.active': { bgcolor: 'primary.main', color: 'white' },
                '&:hover:not(.active)': { bgcolor: '#f1f5f9', color: 'primary.main' }
              }}
            >
              Statystyki
            </Button>
            
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Fade in={true} key={location.key} timeout={500}>
          <Box>
            <Routes location={location}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task/:id" element={<TaskDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
        </Fade>
      </Container>

      <Snackbar open={notification.open} autoHideDuration={4000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} variant="filled" sx={{ width: '100%', borderRadius: 3, fontWeight: 600, boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1)' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <Router>
          <AppContent />
        </Router>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
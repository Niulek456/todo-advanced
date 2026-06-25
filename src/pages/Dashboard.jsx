import { useState } from 'react';
import { Container, Typography, CircularProgress, Alert, Box, Checkbox, IconButton, Paper, Chip, Fade, Button, Stack } from '@mui/material';
import { useTodos } from '../context/TodoContext';
import TaskModal from '../components/TaskModal';

export default function Dashboard() {
  const { todos, loading, error, toggleTodo, deleteTodo } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const openTasks = todos.filter(t => !t.completed);
  const closedTasks = todos.filter(t => t.completed);
  
  let displayedTodos = todos;
  if (filter === 'open') displayedTodos = openTasks;
  if (filter === 'closed') displayedTodos = closedTasks;

  const today = new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <Container maxWidth="sm">
      
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="h4" component="h1" fontWeight="900" sx={{ color: '#1a1a1a', lineHeight: 1.1, mb: 1.5, letterSpacing: '-0.02em' }}>
          Skup się na tym,<br />co ważne.
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight="700" sx={{ textTransform: 'capitalize' }}>
          {today}
        </Typography>
      </Box>

      {/* ŻÓŁTY PRZYCISK GŁÓWNY (Neo-Brutalism CTA) */}
      <Button 
        variant="contained" 
        fullWidth
        onClick={() => setIsModalOpen(true)}
        disableElevation
        sx={{ 
          py: 2, 
          borderRadius: '20px', 
          fontWeight: 900, 
          fontSize: '1.05rem',
          bgcolor: '#FFD600', 
          color: '#1a1a1a',
          transition: 'all 0.2s',
          '&:hover': { bgcolor: '#e6c200', transform: 'translateY(-2px)' },
          mb: 4
        }}
      >
        + Nowe zadanie
      </Button>

      {/* FILTRY Z ŻÓŁTYMI AKCENTAMI */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4, borderBottom: '1px solid #e2e8f0', pb: 2, gap: { xs: 2, sm: 4 } }}>
        <Box 
          onClick={() => setFilter('all')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, opacity: filter === 'all' ? 1 : 0.5, fontWeight: filter === 'all' ? 800 : 600, color: '#1a1a1a', whiteSpace: 'nowrap', transition: '0.2s' }}
        >
          Wszystkie 
          <Chip label={todos.length} size="small" sx={{ bgcolor: filter === 'all' ? '#FFD600' : '#e2e8f0', color: '#1a1a1a', fontWeight: '900', height: 22, borderRadius: 2 }} />
        </Box>

        <Box sx={{ width: '1px', height: '20px', bgcolor: '#cbd5e1' }} />

        <Box 
          onClick={() => setFilter('open')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, opacity: filter === 'open' ? 1 : 0.5, fontWeight: filter === 'open' ? 800 : 600, color: '#1a1a1a', whiteSpace: 'nowrap', transition: '0.2s' }}
        >
          Otwarte 
          <Chip label={openTasks.length} size="small" sx={{ bgcolor: filter === 'open' ? '#FFD600' : '#e2e8f0', color: '#1a1a1a', fontWeight: '900', height: 22, borderRadius: 2 }} />
        </Box>

        <Box 
          onClick={() => setFilter('closed')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, opacity: filter === 'closed' ? 1 : 0.5, fontWeight: filter === 'closed' ? 800 : 600, color: '#1a1a1a', whiteSpace: 'nowrap', transition: '0.2s' }}
        >
          Ukończone 
          <Chip label={closedTasks.length} size="small" sx={{ bgcolor: filter === 'closed' ? '#FFD600' : '#e2e8f0', color: '#1a1a1a', fontWeight: '900', height: 22, borderRadius: 2 }} />
        </Box>
      </Box>

      {/* LISTA ZADAŃ */}
      <Stack spacing={2.5}>
        {displayedTodos.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            <Typography variant="body1" fontWeight="600">Brak zadań w tej kategorii. 🌴</Typography>
          </Box>
        ) : (
          displayedTodos.map((todo, index) => (
            <Fade in={true} timeout={400 + (index * 100)} key={todo.id}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  bgcolor: 'white',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)', 
                  border: '1px solid #e2e8f0',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.06)' }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1, pr: 2 }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      textAlign: 'left',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#94a3b8' : '#1a1a1a',
                      fontWeight: 800,
                      fontSize: '1.1rem'
                    }}
                  >
                    {todo.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', fontWeight: '500' }}>
                      {todo.description || 'Brak opisu'}
                    </Typography>
                    {todo.priority && (
                      <Chip 
                        label={todo.priority} 
                        size="small" 
                        sx={{ height: 20, fontSize: '0.7rem', fontWeight: '800', bgcolor: todo.priority === 'high' ? '#ffe4e6' : '#f1f5f9', color: todo.priority === 'high' ? '#e11d48' : 'text.secondary', borderRadius: '6px' }} 
                      />
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                  <IconButton 
                    edge="end" 
                    onClick={() => deleteTodo(todo.id)}
                    aria-label={`Usuń zadanie ${todo.title}`}
                    sx={{ color: '#cbd5e1', transition: '0.2s', '&:hover': { color: '#ef4444', bgcolor: '#fef2f2', transform: 'scale(1.1)' } }}
                  >
                    <span style={{ fontSize: '1.2rem' }} aria-hidden="true">🗑️</span>
                  </IconButton>
                  
                  {/* ŻÓŁTY CHECKBOX PO ZAZNACZENIU */}
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    inputProps={{ 'aria-label': `Oznacz zadanie ${todo.title} jako wykonane` }}
                    icon={
                      <Box sx={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid #cbd5e1', transition: '0.2s', '&:hover': { borderColor: '#FFD600' } }} />
                    }
                    checkedIcon={
                      <Box sx={{ width: 30, height: 30, borderRadius: '50%', bgcolor: '#FFD600', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1.1)', transition: 'transform 0.2s' }}>
                        <span style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: '900', lineHeight: 1 }}>✓</span>
                      </Box>
                    }
                  />
                </Box>
              </Paper>
            </Fade>
          ))
        )}
      </Stack>

      <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
}
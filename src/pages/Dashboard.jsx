import { useState } from 'react';
import { Container, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Checkbox, IconButton, Paper, Box, Chip, Fade, Button } from '@mui/material';
import { useTodos } from '../context/TodoContext';
import TaskModal from '../components/TaskModal';

export default function Dashboard() {
  // Wyciągamy dane z naszego stanu globalnego
  const { todos, loading, error, toggleTodo, deleteTodo } = useTodos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stan ładowania
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // Stan błędu
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Twoje Zadania
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setIsModalOpen(true)}
          disableElevation
          sx={{ borderRadius: 2, fontWeight: 'bold' }}
        >
          + Dodaj zadanie
        </Button>
      </Box>

      {/* Kontener na listę zadań */}
      <Paper elevation={0} sx={{ border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <List sx={{ p: 0 }}>
          {todos.length === 0 ? (
            <Box sx={{ p: 6, textAlign: 'center', color: 'text.secondary' }}>
              <Typography variant="h6">Brak zadań. Odpoczywaj! 🌴</Typography>
            </Box>
          ) : (
            todos.map((todo, index) => (
              <Fade in={true} timeout={500 + (index * 200)} key={todo.id}>
                <ListItem
                  divider={index !== todos.length - 1}
                  sx={{ 
                    transition: 'background-color 0.2s', 
                    '&:hover': { backgroundColor: '#f8fafc' } 
                  }}
                  secondaryAction={
                   <IconButton edge="end" color="error" onClick={() => deleteTodo(todo.id)}>
                    <span style={{ fontSize: '1.2rem' }}>🗑️</span>
                    </IconButton>
                  }
                >
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    sx={{ '&.Mui-checked': { color: 'primary.main' } }}
                  />
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.secondary' : 'text.primary',
                          fontWeight: 500
                        }}
                      >
                        {todo.title}
                      </Typography>
                    }
                    secondary={todo.description}
                  />
                  {todo.priority && (
                    <Chip 
                      label={todo.priority} 
                      size="small" 
                      color={todo.priority === 'high' ? 'error' : 'default'} 
                      sx={{ ml: 2, fontWeight: 500 }}
                    />
                  )}
                </ListItem>
              </Fade>
            ))
          )}
        </List>
      </Paper>
      <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
}
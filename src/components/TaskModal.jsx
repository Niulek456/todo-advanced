import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTodos } from '../context/TodoContext';

// 1. Definiujemy schemat walidacji za pomocą Zod
const taskSchema = z.object({
  title: z.string().min(3, 'Tytuł musi mieć co najmniej 3 znaki'),
  description: z.string().max(150, 'Opis nie może przekraczać 150 znaków').optional(),
  priority: z.enum(['low', 'medium', 'high']),
});

export default function TaskModal({ open, onClose }) {
  const { addTodo } = useTodos();
  
  // 2. Konfiguracja React Hook Form z użyciem Zod
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: '', description: '', priority: 'medium' }
  });

  // 3. Obsługa wysłania formularza
  const onSubmit = async (data) => {
    await addTodo(data); // Dodajemy do stanu globalnego
    reset(); // Czyścimy formularz
    onClose(); // Zamykamy okienko
  };

  // 4. Obsługa zamknięcia bez zapisywania
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 'bold' }}>Nowe zadanie</DialogTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField
              label="Tytuł zadania"
              fullWidth
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            
            <TextField
              label="Opis (opcjonalnie)"
              fullWidth
              multiline
              rows={3}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            
            <TextField
              select
              label="Priorytet"
              fullWidth
              {...register('priority')}
            >
              <MenuItem value="low">Niski</MenuItem>
              <MenuItem value="medium">Średni</MenuItem>
              <MenuItem value="high">Wysoki</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 600 }}>
            Anuluj
          </Button>
          <Button type="submit" variant="contained" color="primary" disableElevation sx={{ borderRadius: 2 }}>
            Dodaj zadanie
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
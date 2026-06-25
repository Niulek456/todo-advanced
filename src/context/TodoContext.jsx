import { createContext, useState, useEffect, useContext } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nowy stan do obsługi mikrointerakcji i powiadomień sukcesu (Wymóg 8 z wytycznych)
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  // Funkcja pomocnicza do wywoływania powiadomień
  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  // Funkcja do zamykania powiadomienia
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Symulacja pobierania danych z API (GET) po uruchomieniu aplikacji
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        // Udajemy opóźnienie sieciowe wynoszące 1 sekundę
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const savedTodos = localStorage.getItem('advanced_todos');
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
        } else {
          // Początkowe dane testowe, aby aplikacja nie była pusta
          const defaultTodos = [
            { id: '1', title: 'Zaprojektować prototyp w Figmie', description: 'Zrobić lo-fi i hi-fi pod koniec projektu', completed: false, priority: 'high' },
            { id: '2', title: 'Zaimplementować aplikację w React', description: 'Użyć MUI, Context API oraz React Hook Form', completed: true, priority: 'high' },
          ];
          setTodos(defaultTodos);
          localStorage.setItem('advanced_todos', JSON.stringify(defaultTodos));
        }
      } catch (err) {
        setError('Nie udało się załadować zadań z "serwera".');
        showNotification('Nie udało się pobrać zadań!', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Funkcja dodawania zadania (Symulacja POST)
  const addTodo = async (todo) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // małe opóźnienie
      const newTodo = { id: Date.now().toString(), ...todo, completed: false };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem('advanced_todos', JSON.stringify(updatedTodos));
      showNotification('Pomyślnie dodano nowe zadanie!'); // Feedback sukcesu
    } catch (err) {
      setError('Błąd podczas dodawania zadania.');
      showNotification('Nie udało się dodać zadania.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Funkcja zmiany statusu (Symulacja PUT)
  const toggleTodo = (id) => {
    const todoToToggle = todos.find(t => t.id === id);
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('advanced_todos', JSON.stringify(updatedTodos));
    
    if (todoToToggle) {
      const statusMessage = !todoToToggle.completed ? 'Zadanie oznaczone jako wykonane! 🎉' : 'Przywrócono zadanie.';
      showNotification(statusMessage, 'info');
    }
  };

  // Funkcja usuwania zadania (Symulacja DELETE)
  const deleteTodo = async (id) => {
    try {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem('advanced_todos', JSON.stringify(updatedTodos));
      showNotification('Zadanie zostało usunięte.', 'warning'); // Feedback usunięcia
    } catch (err) {
      setError('Nie udało się usunąć zadania.');
      showNotification('Błąd podczas usuwania zadania.', 'error');
    }
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      loading, 
      error, 
      addTodo, 
      toggleTodo, 
      deleteTodo, 
      setError,
      notification,             // udostępniamy stan powiadomienia
      handleCloseNotification   // udostępniamy funkcję zamknięcia powiadomienia
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
import { Container, Typography, Grid, Paper, Box, LinearProgress, Avatar } from '@mui/material';
import { useTodos } from '../context/TodoContext';

export default function Profile() {
  const { todos } = useTodos();

  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const highPriorityTasks = todos.filter(t => t.priority === 'high' && !t.completed).length;

  const weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
  const currentDayIndex = (new Date().getDay() + 6) % 7; 
  
  const activityLevels = weekDays.map((_, index) => {
    if (index < currentDayIndex) return [40, 75, 45, 90, 60, 20][index] || 30; 
    if (index === currentDayIndex) return Math.min((completedTasks * 25) + 10, 100); 
    return 0; 
  });

  return (
    <Container maxWidth="lg">
      
      {/* NAGŁÓWEK */}
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="h4" fontWeight="700" sx={{ color: '#64748b', mb: -0.5 }}>
          Cześć,
        </Typography>
        <Typography variant="h2" fontWeight="900" sx={{ color: '#1a1a1a', letterSpacing: '-0.04em' }}>
          Jan.
        </Typography>
      </Box>

      {/* GŁÓWNA SIATKA */}
      <Grid container spacing={3}>
        
        {/* ================= RZĄD 1 (Góra) ================= */}
        
        {/* 1. Profil (4/12) */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #e2e8f0', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <Avatar sx={{ bgcolor: '#1a1a1a', color: '#FFD600', width: 80, height: 80, fontWeight: '900', fontSize: '2.5rem', mb: 2 }}>
              JK
            </Avatar>
            <Typography variant="h5" fontWeight="900" sx={{ color: '#1a1a1a', lineHeight: 1.1, mb: 0.5 }}>
              Jan Kowalski
            </Typography>
            <Typography variant="body2" fontWeight="700" sx={{ color: '#64748b', mb: 'auto' }}>
              Student IT
            </Typography>

            <Box sx={{ width: '100%', bgcolor: '#f8fafc', p: 1.5, px: 2, borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
              <Typography variant="caption" fontWeight="800" color="text.secondary" textTransform="uppercase">
                Plan konta
              </Typography>
              <Box sx={{ bgcolor: '#FFD600', px: 1.5, py: 0.5, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" fontWeight="900" color="#1a1a1a" sx={{ display: 'block', lineHeight: 1.2 }}>PRO</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* 2. Wskaźnik ukończenia (3/12) */}
        <Grid item xs={12} md={3}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #e2e8f0', bgcolor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="subtitle2" fontWeight="800" textTransform="uppercase" sx={{ color: '#64748b', mb: 2 }}>Wskaźnik ukończenia</Typography>
            <Typography variant="h1" fontWeight="900" sx={{ color: '#1a1a1a', mb: 4, letterSpacing: '-0.04em' }}>{completionRate}%</Typography>
            <LinearProgress 
              variant="determinate" 
              value={completionRate} 
              sx={{ height: 12, borderRadius: 6, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#FFD600' } }}
            />
          </Paper>
        </Grid>

        {/* 3. Aktywność w tygodniu (5/12) - Wyrównane prawą stroną ze statystykami */}
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #e2e8f0', bgcolor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" fontWeight="800" textTransform="uppercase" sx={{ color: '#64748b', mb: 'auto' }}>Aktywność w tygodniu</Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '140px', mt: 4 }}>
              {weekDays.map((day, index) => {
                const barHeight = Math.max(activityLevels[index], 5); 
                return (
                  <Box key={day} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, height: '100%', justifyContent: 'flex-end' }}>
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: `${barHeight}%`, 
                        bgcolor: index === currentDayIndex ? '#FFD600' : (activityLevels[index] > 0 ? '#1a1a1a' : '#f1f5f9'), 
                        borderRadius: '100px', 
                        transition: 'height 0.5s ease-out' 
                      }} 
                    />
                    <Typography variant="caption" fontWeight="800" sx={{ color: index === currentDayIndex ? '#1a1a1a' : '#94a3b8', fontSize: '0.7rem' }}>
                      {day}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>


        {/* ================= RZĄD 2 (Dół) ================= */}
        
        {/* 4. Alert / Powiadomienia (7/12) - Sumuje szerokość profilu (4) i wskaźnika (3) */}
        <Grid item xs={12} md={7}>
          {highPriorityTasks > 0 ? (
            <Paper elevation={0} sx={{ height: '100%', p: 4, borderRadius: '24px', bgcolor: '#1a1a1a', color: '#ffffff', display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ bgcolor: '#FFD600', width: 16, height: 16, borderRadius: '50%', flexShrink: 0 }} />
              <Typography variant="h6" fontWeight="700">
                Uwaga: Masz {highPriorityTasks} pilne zadania do wykonania!
              </Typography>
            </Paper>
          ) : (
            <Paper elevation={0} sx={{ height: '100%', p: 4, borderRadius: '24px', border: '1px solid #e2e8f0', bgcolor: '#ffffff', display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ bgcolor: '#22c55e', width: 16, height: 16, borderRadius: '50%', flexShrink: 0 }} />
              <Typography variant="h6" fontWeight="700" color="text.secondary">
                Świetnie! Wszystkie pilne zadania są ukończone.
              </Typography>
            </Paper>
          )}
        </Grid>

        {/* 5. Statystyki (5/12) - Wyrównane idealnie pod aktywnością (5/12) */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', width: '100%', height: '100%', gap: 2 }}>
            
            {/* Żółty Kafelek - dodano minWidth: 0, by tekst go nie rozpychał */}
            <Paper elevation={0} sx={{ flex: 1, minWidth: 0, bgcolor: '#FFD600', color: '#1a1a1a', p: 1.5, borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h4" fontWeight="900" sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>{totalTasks}</Typography>
              <Typography variant="caption" fontWeight="800" textTransform="uppercase" noWrap sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' }, mt: 0.5 }}>Ogółem</Typography>
            </Paper>

            {/* Czarny Kafelek */}
            <Paper elevation={0} sx={{ flex: 1, minWidth: 0, bgcolor: '#1a1a1a', color: '#ffffff', p: 1.5, borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h4" fontWeight="900" sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>{completedTasks}</Typography>
              <Typography variant="caption" fontWeight="800" textTransform="uppercase" noWrap sx={{ color: '#94a3b8', fontSize: { xs: '0.6rem', sm: '0.65rem' }, mt: 0.5 }}>Gotowe</Typography>
            </Paper>

            {/* Biały Kafelek */}
            <Paper elevation={0} sx={{ flex: 1, minWidth: 0, bgcolor: '#ffffff', border: '1px solid #e2e8f0', p: 1.5, borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h4" fontWeight="900" sx={{ color: '#1a1a1a', fontSize: { xs: '1.75rem', sm: '2rem' } }}>{pendingTasks}</Typography>
              <Typography variant="caption" fontWeight="800" textTransform="uppercase" noWrap sx={{ color: '#64748b', fontSize: { xs: '0.6rem', sm: '0.65rem' }, mt: 0.5 }}>W toku</Typography>
            </Paper>

          </Box>
        </Grid>

      </Grid>
    </Container>
  );
}
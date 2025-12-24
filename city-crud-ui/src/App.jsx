import React, { useState, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components
import CityList from './CityList';
import CityForm from './CityForm';

// Use Laravel or Node backend by changing the value below:
// Always try Laravel first, then Node.js as fallback
const API_BASES = [
  'http://localhost:8000/api/cities', // Laravel
  'http://localhost:3000/cities'      // Node.js
];

// Helper to try both URLs for any fetch
async function fetchWithFallback(urlPath = '', options = {}) {
  let lastError;
  for (const base of API_BASES) {
    try {
      const res = await fetch(base + urlPath, options);
      if (res.ok) return res;
      lastError = new Error(`Failed at ${base + urlPath}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('All API endpoints failed');
}

function App() {
  // --- Data State ---
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- UI State ---
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Theme Configuration (Cool Indigo/Pink) ---
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: { main: '#6366f1' }, // Indigo
          secondary: { main: '#ec4899' }, // Pink
          background: {
            default: prefersDarkMode ? '#0f172a' : '#f0f2f5',
            paper: prefersDarkMode ? '#1e293b' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "sans-serif"',
          h5: { fontWeight: 700 },
        },
        components: {
          MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
          MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } } },
        },
      }),
    [prefersDarkMode],
  );

  // --- API Actions ---

  const fetchCities = async () => {
    setLoading(true);
    setError(null);
    try {
        const res = await fetchWithFallback();
      if (!res.ok) throw new Error('Failed to fetch cities');
      const data = await res.json();
      setCities(data);
    } catch (err) {
      setError(err.message || 'Could not load data. Is the JSON server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddOrUpdateCity = async (cityData) => {
    setError(null);
    try {
      if (cityData.id) {
        // Update
          const res = await fetchWithFallback(`/${cityData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: cityData.name, country: cityData.country })
        });
        if (!res.ok) throw new Error('Failed to update city');
      } else {
        // Add
        // Note: JSON Server generates IDs automatically, but if you need to manually:
        const payload = { ...cityData, id: String(Date.now()) }; 
          const res = await fetchWithFallback('', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to add city');
      }
      
      // Refresh and close UI
      await fetchCities();
      setDialogOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCity = async (id) => {
    if (!window.confirm('Are you sure you want to delete this city?')) return;
    
    setError(null);
    try {
      const res = await fetchWithFallback(`/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete city');
      await fetchCities();
      if (editingCity && editingCity.id === id) setEditingCity(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // --- UI Handlers ---

  const handleAddClick = () => {
    setEditingCity(null);
    setDialogOpen(true);
  };

  const handleEditClick = (city) => {
    setEditingCity(city);
    setDialogOpen(true);
  };

  // Client-side filtering
  const filteredCities = cities.filter(city => 
    (city.name && city.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (city.country && city.country.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Navbar with Glassmorphism */}
      <AppBar 
        position="sticky" 
        color="transparent" 
        elevation={0} 
        sx={{ 
          backdropFilter: 'blur(20px)', 
          background: 'rgba(255,255,255,0.7)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          top: 0
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              background: '-webkit-linear-gradient(45deg, #6366f1 30%, #ec4899 90%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}
          >
            CityCRUD
          </Typography>
          
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              width: { xs: 150, sm: 300 }, 
              bgcolor: 'background.paper', 
              borderRadius: 2,
              '& fieldset': { border: 'none' },
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
        {/* Loading Bar at top */}
        {loading && <LinearProgress color="secondary" sx={{ height: 3 }} />}
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 12 }}>
        
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="800" gutterBottom>
            Global Destinations
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {loading ? 'Syncing with database...' : `Manage your ${cities.length} travel locations`}
          </Typography>
        </Box>

        <CityList 
          cities={filteredCities} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteCity} 
        />
      </Container>

      {/* FAB */}
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={handleAddClick}
        sx={{ 
          position: 'fixed', 
          bottom: 32, 
          right: 32,
          background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
          boxShadow: '0 8px 20px rgba(99, 102, 241, 0.5)'
        }}
      >
        <AddIcon />
      </Fab>

      {/* Dialog */}
      <Dialog 
        open={isDialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, padding: 1 } }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
          {editingCity ? 'Edit Destination' : 'New Destination'}
        </DialogTitle>
        <CityForm 
          onSubmit={handleAddOrUpdateCity} 
          editingCity={editingCity} 
          onCancel={() => setDialogOpen(false)} 
        />
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
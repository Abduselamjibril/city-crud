import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grow from '@mui/material/Grow';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

function CityList({ cities, onEdit, onDelete }) {
  const theme = useTheme();

  if (!cities || cities.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10, opacity: 0.6 }}>
        <Typography variant="h5" fontWeight="bold">No cities found.</Typography>
        <Typography variant="body1">Click the + button to add one to the database.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {cities.map((city, index) => (
        <Grow in={true} timeout={(index + 1) * 200} key={city.id}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                
                // --- DYNAMIC BACKGROUND FIX ---
                background: theme.palette.mode === 'dark' 
                  ? 'rgba(30, 41, 59, 0.7)'   // Dark translucent for dark mode
                  : 'rgba(255, 255, 255, 0.8)', // White translucent for light mode
                
                backdropFilter: 'blur(10px)',
                
                // Add a subtle border in dark mode to separate card from background
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.1)' 
                  : 'none',

                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 12px 20px rgba(0,0,0,0.5)'
                    : '0 12px 20px rgba(0,0,0,0.15)'
                }
              }}
              elevation={2}
            >
               {/* Decorative Gradient Circle */}
               <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -30, 
                    right: -30, 
                    width: 120, 
                    height: 120, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #6366f1 30%, #ec4899 90%)',
                    opacity: 0.15,
                    pointerEvents: 'none'
                  }} 
                />

              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOnIcon color="error" sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="overline" color="text.secondary" fontWeight="bold">
                    DESTINATION
                  </Typography>
                </Box>
                
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div" 
                  fontWeight="800"
                  color="text.primary" // Ensures text adapts to theme (White in dark mode)
                >
                  {city.name}
                </Typography>
                
                <Chip 
                  label={city.country} 
                  color="primary" 
                  variant={theme.palette.mode === 'dark' ? 'filled' : 'outlined'} 
                  size="small" 
                  sx={{ mt: 1, fontWeight: 600 }}
                />
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <IconButton 
                  onClick={() => onEdit(city)} 
                  color="primary" 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(99, 102, 241, 0.1)', 
                    mr: 1, 
                    '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.2)' } 
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  onClick={() => onDelete(city.id)} 
                  color="error" 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255, 99, 99, 0.1)', 
                    '&:hover': { bgcolor: 'rgba(255, 99, 99, 0.2)' } 
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
}

export default CityList;
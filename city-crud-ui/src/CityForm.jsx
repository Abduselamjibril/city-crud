import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InputAdornment from '@mui/material/InputAdornment';

function CityForm({ onSubmit, editingCity, onCancel }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (editingCity) {
      setName(editingCity.name);
      setCountry(editingCity.country);
    } else {
      setName('');
      setCountry('');
    }
  }, [editingCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, country, id: editingCity?.id });
    // Clear form
    setName('');
    setCountry('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="City Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCityIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
        <TextField
          margin="dense"
          label="Country"
          type="text"
          fullWidth
          variant="outlined"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PublicIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onCancel} color="inherit" variant="text">
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          sx={{ 
            px: 4, 
            borderRadius: 2,
            boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
          }}
        >
          {editingCity ? 'Update City' : 'Add City'}
        </Button>
      </DialogActions>
    </Box>
  );
}

export default CityForm;
'use client';

import { useState } from 'react';
import PantryForm from './components/pantryForm';
import { Button, Typography, Container, Box } from '@mui/material';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (item = null) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedItem(null);
    setIsFormOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: '20px' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Welcome to Your Pantry Tracker
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Keep track of all your pantry items with ease. Add, update, and filter items to ensure you always know what you have on hand.
        </Typography>
        <Button 
          onClick={() => handleOpenForm()} 
          variant="contained" 
          color="primary" 
          sx={{ marginBottom: '20px', backgroundColor: 'black'}}
        >
          Add New Item
        </Button>
        {isFormOpen && (
          <PantryForm
            currentItem={selectedItem}
            onClose={handleCloseForm}
          />
        )}
      </Box>
    </Container>
  );
}

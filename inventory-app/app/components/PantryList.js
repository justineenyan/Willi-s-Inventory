import { useState } from 'react';
import { Grid, Button, Typography, Card, CardContent } from '@mui/material';
import PantryForm from './PantryForm';
import usePantry from '../hooks/usePantry';

const PantryList = () => {
  const { items, addItem, updateItem, deleteItem } = usePantry();
  const [currentItem, setCurrentItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setCurrentItem(null);
    setShowForm(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Pantry Items</Typography>
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>Add New Item</Button>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                  <Typography variant="body2">Expiry Date: {item.expiryDate}</Typography>
                  <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Button 
                      onClick={() => handleEdit(item)} 
                      variant="contained" 
                      color="primary"
                      style={{ flex: 1 }}
                    >
                      Edit
                    </Button>
                    <Button 
                      onClick={() => updateItem(item.id, item)} // Update functionality added here
                      variant="contained" 
                      color="secondary"
                      style={{ flex: 1 }}
                    >
                      Update
                    </Button>
                  </Box>
                  <Button 
                    onClick={() => deleteItem(item.id)} 
                    variant="contained" 
                    color="error"
                    style={{ marginTop: '3px' }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {showForm && (
        <PantryForm currentItem={currentItem} onClose={handleCloseForm} handleEdit={handleEdit} />
      )}
    </Grid>
  );
};

export default PantryList;
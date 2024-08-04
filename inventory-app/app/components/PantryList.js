'use client'; 
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import usePantry from '../hooks/usePantry';
import PantryForm from './pantryForm';
import { useState } from 'react';

const PantryList = () => {
  const { items, deleteItem } = usePantry();
  const [currentItem, setCurrentItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  return (
    <div>
      <Button onClick={() => { setShowForm(true); setCurrentItem(null); }} variant="contained" color="primary" style={{ marginBottom: '20px'}}>
        Add New Item
      </Button>
      {showForm && (
        <PantryForm currentItem={currentItem} onClose={() => setShowForm(false)} />
      )}
      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{item.name}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Category: {item.category}</Typography>
                <Typography>Expiry Date: {item.expiryDate}</Typography>
                <Button onClick={() => handleEdit(item)} variant="contained" color="primary" style={{ backgroundColor: 'black'}}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(item.id)} variant="contained" color="secondary">
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PantryList;

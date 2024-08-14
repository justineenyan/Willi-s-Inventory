import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Typography, Box, Divider } from '@mui/material';
import usePantry from '../hooks/usePantry';

const PantryForm = ({ currentItem, onClose, handleEdit }) => {
  const [name, setName] = useState(currentItem?.name || '');
  const [quantity, setQuantity] = useState(currentItem?.quantity || '');
  const [category, setCategory] = useState(currentItem?.category || '');
  const [expiryDate, setExpiryDate] = useState(currentItem?.expiryDate || '');

  const [filterCategory, setFilterCategory] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filteredItems, setFilteredItems] = useState({});

  const { items, addItem, updateItem, deleteItem } = usePantry();

  useEffect(() => {
    const applyFilters = () => {
      const filtered = items.filter(item => {
        const matchesCategory = !filterCategory || item.category === filterCategory;
        const matchesDate = !filterDate || new Date(item.expiryDate) <= new Date(filterDate);
        return matchesCategory && matchesDate;
      });

      const grouped = filtered.reduce((groups, item) => {
        if (!groups[item.category]) {
          groups[item.category] = [];
        }
        groups[item.category].push(item);
        return groups;
      }, {});

      setFilteredItems(grouped);
    };

    applyFilters();
  }, [items, filterCategory, filterDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = { name, quantity, category, expiryDate };
    if (currentItem) {
      await updateItem(currentItem.id, item); // Update item if currentItem is provided
    } else {
      await addItem(item); // Add new item if currentItem is not provided
    }
    onClose();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    onClose(); // Optionally close the form after deletion
  };

  return (
    <Grid container spacing={2} style={{ padding: '20px' }}>
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: '#F8F9FA', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h6" gutterBottom>{currentItem ? 'Edit Item' : 'Add Item'}</Typography>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            color="primary"
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            color="primary"
          />
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            select
            fullWidth
            margin="normal"
            variant="outlined"
            color="primary"
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Fruits">Fruits</MenuItem>
            <MenuItem value="Vegetables">Vegetables</MenuItem>
            <MenuItem value="Grains/Legumes">Grains/Legumes</MenuItem>
            <MenuItem value="Groceries">Groceries</MenuItem>
          </TextField>
          <TextField
            label="Expiry Date"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            color="primary"
          />
          <Box display="flex" justifyContent="flex-end" gap={2} marginTop={2}>
            {currentItem ? (
              <>
                <Button type="submit" variant="contained" color="primary">
                  Update Item
                </Button>
                <Button 
                  onClick={() => handleDelete(currentItem.id)} 
                  variant="contained" 
                  color="secondary"
                >
                  Delete Item
                </Button>
              </>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Add Item
              </Button>
            )}
          </Box>
        </form>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>Filters</Typography>
        <TextField
          label="Filter by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          select
          fullWidth
          margin="normal"
          variant="outlined"
          color="primary"
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Fruits">Fruits</MenuItem>
          <MenuItem value="Vegetables">Vegetables</MenuItem>
          <MenuItem value="Grains/Legumes">Grains/Legumes</MenuItem>
          <MenuItem value="Groceries">Groceries</MenuItem>
        </TextField>
        <TextField
          label="Filter by Expiry Date"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          color="primary"
        />
        <Typography variant="h6" marginTop={2} gutterBottom>Items</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {Object.entries(filteredItems).map(([category, items]) => (
            <Box key={category} mt={2}>
              <Typography variant="h6" gutterBottom>{category}</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {items.map((item) => (
                  <Box
                    key={item.id}
                    border={1}
                    borderColor="grey.300"
                    borderRadius="8px"
                    padding={2}
                    boxShadow={3}
                    bgcolor="white"
                    transition="transform 0.2s ease-in-out"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '230px', // Adjusted height for better space management
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                      }
                    }}
                  >
                    <Box flexGrow={1}>
                      <Typography variant="body1" fontWeight="bold">Name:</Typography>
                      <Typography variant="body1" marginBottom={1}>{item.name}</Typography>
                      <Typography variant="body1" fontWeight="bold">Quantity:</Typography>
                      <Typography variant="body1" marginBottom={1}>{item.quantity}</Typography>
                      <Typography variant="body1" fontWeight="bold">Expiry Date:</Typography>
                      <Typography variant="body1">{item.expiryDate}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Button 
                        onClick={() => handleEdit(item)} 
                        variant="contained" 
                        color="primary"
                        style={{ flex: 1 }}
                      >
                        Update
                      </Button>

                      <Button 
                        onClick={() => handleDelete(item.id)} 
                        variant="contained" 
                        color="secondary"
                        style={{ flex: 1 }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Divider style={{ margin: '10px 0' }} />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
    
  );
};

export default PantryForm;

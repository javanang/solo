import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Title from './Title';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

export default function AddProduct(props) {
  const theme = useTheme();
  const [part, setPart] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const details = { part_number: data.get('part_number'), description: data.get('description') };
    fetch('/dashboard-server/create', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => console.log(response.json()))
      .then(() => props.setListLength(props.listLength + 1))
      .catch(err => console.log('Delete Submit: ERROR: ', err));
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: 'space-between'
          }}
        >
          <Title>Add Product</Title>
          <Button
            type="submit"
            color="primary"
            variant='contained'
          >
            Add
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <TextField
            margin="normal"
            required
            width="2"
            id="part_number"
            label="Part Number"
            name="part_number"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="description"
            id="description"
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}

import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Switch } from '@mui/material';
import Button from '@mui/material/Button';

export default function Orders(props) {

  const handleSwitchChange = (row) => {
    row.available = !row.available;
    fetch('/dashboard-server/available', {
      method: 'PUT',
      body: JSON.stringify(row),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .catch(err => console.log('Available Update Submit: ERROR: ', err));
  };

  const handleDelete = (row) => {
    fetch('/dashboard-server/deleteProduct', {
      method: 'DELETE',
      body: JSON.stringify(row),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(() => props.setListLength(props.listLength - 1))
      .catch(err => console.log('Delete Submit: ERROR: ', err));
    
  };

  return (
    <React.Fragment>
      <Title>My Products</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Part Number</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Available</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.myProducts.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.part_number}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Switch
                  defaultChecked={row.available}
                  onChange={() => handleSwitchChange(row)}
                />
              </TableCell>
              <TableCell>
                <Button
                  startIcon={<DeleteIcon />}
                  color='error'
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

import React from 'react';
import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import { ListItemButton } from '@mui/material';




function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log('Get all products: ERROR: ', err));
  }, []);

  const handleListItemClick = () => {

  };

  return (
    <List>
      {products.map((element, index) => {
        return <ListItemButton key={index}>{element.description}</ListItemButton>
      })}
    </List>
  )


}

export default AllProducts
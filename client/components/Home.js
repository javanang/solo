import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { createApi } from 'unsplash-js';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const unsplash = createApi({
  accessKey: 'kO6iHhGlmJyR7dAFN7OXuy8Y7ba0UdTs0OM68rbtJ3Q'
});

function Home() {
  // const [photoURL, setPhotoURL] = useState("");

  // useEffect(() => {
  //   unsplash.photos.get({ photoId: 'random' })
  //   .then(res => console.log(res.json))
  //   .then(data => {
  //     setPhotoURL(data.urls.full);
  //     return console.log(data);
  //   })
  //   .catch(err => console.log(err));
  // }, []);

  return (
    <Box sx={{
      backgroundImage: `url(https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=92f3e02f63678acc8416d044e189f515)`,
      height: '800px',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <CssBaseline />
    </Box>
  )
}

export default Home
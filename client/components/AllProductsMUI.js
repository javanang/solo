import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function AllProducts(props) {
  const [products, setProducts] = React.useState([]);
  const { theme } = props;

  React.useEffect(() => {
    fetch('/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log('Get all products: ERROR: ', err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 2 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={1}>
            {products.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      height: '100%',
                    }}
                    // image="https://source.unsplash.com/fbAnIjhrOL4"
                    image={`https://source.unsplash.com/random/?${card.description}`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.description.charAt(0).toUpperCase() + card.description.slice(1)}
                    </Typography>
                    <Typography>
                      P/N {card.part_number}
                    </Typography>
                    <Typography>
                      Listed by <b>{card.username}</b>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Add</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

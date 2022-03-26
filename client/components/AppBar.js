import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const pages = ['Products'];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleModeChange = () => {
    props.mode === 'light' ? props.setMode('dark') : props.setMode('light');
  };

  const handleLogout = () => {
    fetch('/login/out', {
      method: 'PUT',
      body: JSON.stringify(props),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => { 
        props.setUsername(null);
        props.setUserId(null);
        props.setLoginStatus(false);
        return
      })
      .catch (err => console.log('Logout Submit: ERROR: ', err));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters color="secondary">
          <Typography
            variant="h6"
            noWrap
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            COCO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={1} onClick={handleCloseNavMenu} component={Link} to={'/'}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem key={2} onClick={handleCloseNavMenu} component={Link} to={'/stuff'}>
                <Typography textAlign="center">Products</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            COCO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key={1}
              onClick={handleCloseNavMenu}
              component={Link}
              to={'/'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              key={2}
              onClick={handleCloseNavMenu}
              component={Link}
              to={'/stuff'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Products
            </Button>

          </Box>

          {props.isLoggedIn ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <PersonIcon/> */}
                  <Avatar alt={props.username} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={1} onClick={() => {handleCloseUserMenu(); handleModeChange()}}>
                  <Typography textAlign="center">Mode</Typography>
                </MenuItem>
                <MenuItem key={2} onClick={handleCloseUserMenu} component={Link} to={'/dashboard'}>
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem key={3} onClick={() => { handleCloseUserMenu(); props.setLoginStatus(false); handleLogout() }} component={Link} to={'/'}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
            :
            <Box sx={{ flexGrow: 0 }}>
              <Button variant="contained" color="secondary" component={Link} to={'/signinup'}>Login / SignUp</Button>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

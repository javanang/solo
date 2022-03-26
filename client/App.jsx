import React, { useEffect, useState } from 'react';
import AllProducts from './components/AllProductsMUI'
import SignIn from './components/SignInMUI';
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/Home';
import Cookies from 'js-cookie';
import AppBar from './components/AppBar';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from './components/SignUpMUI';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Snackbar } from '@mui/material';

const App = () => {
  const [isLoggedIn, setLoginStatus] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [mode, setMode] = useState("light");
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [counter, setCounter] = useState(0);
  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#74c69d',
      },
      secondary: {
        main: '#40916c',
      },
    },
    status: {
    },
  });

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    console.log(err);
    if (err) {
      setOpen(true);
    }
  }, [err]);


  useEffect(() => {
    if (Cookies.get('ssid') !== undefined) {
      fetch('/login/check')
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          if (data.login) {
            setUsername(data.username);
            setUserId(data.userId);
            setLoginStatus(true);
            setOpenLogin(true);
          }
          return
        })
        .catch(err => console.log('cookie login check: ERROR: ', err));
    }
  }, []);

  useEffect(() => {
    if (counter !== 0) isLoggedIn ? setOpenLogin(true) : setOpenLogout(true)
    setCounter(counter + 1);
  }, [isLoggedIn]);

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleLogoutClose = () => {
    setOpenLogout(false);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme} >
        <AppBar
          isLoggedIn={isLoggedIn}
          userId={userId}
          username={username}
          setLoginStatus={setLoginStatus}
          mode={mode}
          setMode={setMode}
        />
        <Routes>
          <Route
            exact
            path='/'
            element={<Home />}
          />
          <Route
            exact
            path='/signinup'
            element={<SignIn
              isLoggedIn={isLoggedIn}
              setLoginStatus={setLoginStatus}
              setUsername={setUsername}
              setUserId={setUserId}
              setErr={setErr}
            />}
          />
          <Route
            exact
            path='/newuser'
            element={<SignUp />}
          />
          <Route
            exact
            path='/stuff'
            element={<AllProducts theme={theme} />}
          />
          <Route
            exact
            path='/dashboard'
            element={<Dashboard />}
          />
        </Routes>
        <Snackbar
          open={openLogin}
          message={`Logged in as user ${username}`}
          autoHideDuration={3000}
          onClose={handleLoginClose}
        ></Snackbar>
        <Snackbar
          open={openLogout}
          message={`Logged out`}
          autoHideDuration={3000}
          onClose={handleLogoutClose}
        ></Snackbar>
        <Snackbar
          open={open}
          message={`${err}`}
          autoHideDuration={3000}
          onClose={handleClose}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
import React, { useState } from 'react';
import AllProducts from './components/AllProducts';
import ProductCreator from './components/ProductCreator';
import SignIn from './components/SignInMUI';

import AppBar from './components/AppBar';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from './components/SignUpMUI';

const App = () => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <BrowserRouter>
      <AppBar
        isLoggedIn={isLoggedIn}
        setLoginStatus={setLoginStatus}
      />
      <Routes>
        <Route 
          exact
          path='/'
          element={<SignUp />}
        />
        <Route
          exact
          path='/signinup'
          element={<SignIn
            isLoggedIn={isLoggedIn}
            setLoginStatus={setLoginStatus}
            setUsername={setUsername}
            setUserId={setUserId}
          />}
        />
        <Route
          exact
          path='/newuser' 
          element={<SignUp />}
        />
        <Route
          exact
          path='/products'
          element={<AllProducts
          />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
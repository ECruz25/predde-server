import React, { useState } from 'react';
import { TextField, FormLabel, Button } from '@material-ui/core';
import Nav from '../Nav';

const LoginForm = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const submitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://predde.herokuapp.com/api/users/login',
        {
          headers: { 'Content-type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({ username, password })
        }
      );
      await fetch('https://predde.herokuapp.com/api');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = component => {
    if (
      component === 'LOGIN' ||
      component === 'LOGOUT' ||
      component === 'REGISTER'
    ) {
      history.push(`/${component}`);
    } else {
      history.push(`/editorial/${component}`);
    }
  };

  return (
    <div>
      <Nav handleOnChange={handleOnChange} />
      <form
        style={{
          display: 'grid',
          width: '25%',
          margin: '100px auto',
          gridRowGap: '30px'
        }}
        onSubmit={submitForm}
        method="post"
      >
        <div
          className="input"
          style={{ display: 'grid', gridTemplateColumns: '100%' }}
        >
          <FormLabel htmlFor="username">Usuario</FormLabel>
          <TextField
            type="text"
            name="username"
            id="username"
            required
            onChange={handleUserNameChange}
          />
        </div>
        <div
          className="input"
          style={{ display: 'grid', gridTemplateColumns: '100%' }}
        >
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <TextField
            type="password"
            name="password"
            id="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

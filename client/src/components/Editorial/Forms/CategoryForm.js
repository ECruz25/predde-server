import React, { useState } from 'react';
import { TextField, FormLabel, FormControl, Button } from '@material-ui/core';
import Nav from '../Nav';

const CategoryForm = ({ history }) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const handleNameChange = ({ target }) => {
    setName(target.value);
  };

  const handleDescriptionChange = ({ target }) => {
    setDescription(target.value);
  };
  const submitForm = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://predde.herokuapp.com/api/categories',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ description, name })
        }
      );
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
    <div className="FormsDiv">
      <Nav handleOnChange={handleOnChange} />
      <form
        style={{
          display: 'grid',
          width: '80%',
          margin: '120px auto',
          gridRowGap: '30px'
        }}
        encType="multipart/form-data"
        onSubmit={submitForm}
        method="post"
      >
        <h2 style={{ color: 'black' }}>Nueva categoria</h2>
        <div
          className="input"
          style={{ display: 'grid', gridTemplateColumns: '100%' }}
        >
          <FormLabel htmlFor="nombre">Nombre</FormLabel>
          <TextField
            type="text"
            name="name"
            id="name"
            required
            onChange={handleNameChange}
          />
        </div>
        <div
          className="input"
          style={{ display: 'grid', gridTemplateColumns: '100%' }}
        >
          <FormLabel htmlFor="Descripcion">Descripcion</FormLabel>
          <TextField
            type="text"
            name="Descripcion"
            id="Descripcion"
            required
            onChange={handleDescriptionChange}
          />
        </div>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;

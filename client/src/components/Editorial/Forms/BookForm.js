import React, { useState, useEffect } from 'react';
import {
  Input,
  TextField,
  FormLabel,
  NativeSelect,
  FormControl,
  Button
} from '@material-ui/core';
import Nav from '../Nav';
import axios from 'axios';

const BookForm = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(undefined);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch('https://predde.herokuapp.com/api/categories');
    const categoriesArray = await response.json();
    setCategories(categoriesArray);
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

  const submitForm = async (e, item) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('price', price);
    if (category === undefined || category === '') {
      formData.append('category', categories[0]._id);
    } else {
      formData.append('category', category);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios
      .post('/api/books', formData, config)
      .then(response => {
        alert(`Se ha creado el libro: ${name}`);
      })
      .catch(error => {
        alert(error);
      });
  };

  const onHandleImageChange = ({ target }) => {
    setImage(target.files[0]);
  };

  const onHandleNameChange = ({ target }) => {
    setName(target.value);
  };

  const onHandlePriceChange = ({ target }) => {
    setPrice(target.value);
  };

  const onHandleCategoryChange = ({ target }) => {
    setCategory(target.value);
  };

  return (
    <div className="FormsDiv">
      <Nav handleOnChange={handleOnChange} />
      <form
        style={{
          display: 'grid',
          width: '80%',
          margin: '16px auto',
          gridRowGap: '30px'
        }}
        encType="multipart/form-data"
        onSubmit={submitForm}
        method="post"
      >
        <h2 style={{ color: '#d44179' }}>Ingrese la informacion del Libro</h2>
        <div
          className="input"
          style={{ display: 'grid', gridTemplateColumns: '100%' }}
        >
          <FormLabel htmlFor="nombre">Nombre</FormLabel>
          <TextField
            type="text"
            name="nombre"
            id="nombre"
            required
            onChange={onHandleNameChange}
          />
        </div>
        <div
          className="input"
          style={{ display: 'grid', gridTemplateColumns: '100%' }}
        >
          <FormLabel htmlFor="precio">Precio</FormLabel>
          <TextField
            type="number"
            name="precio"
            id="precio"
            required
            onChange={onHandlePriceChange}
          />
        </div>
        <div
          className="input"
          style={{ display: 'grid', gridTemplateColumns: '100%' }}
        >
          <FormLabel htmlFor="categoria">Categoria</FormLabel>
          <NativeSelect
            name="categoria"
            id="categoria"
            onChange={onHandleCategoryChange}
            required
            value={category}
          >
            {Object.keys(categories).map(key => (
              <option value={categories[key]._id}>
                {console.log(categories[key]._id)}
                {categories[key].name}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div
          className="input"
          style={{ display: 'grid', gridTemplateColumns: '100%' }}
        >
          <FormLabel htmlFor="photo">Imagen</FormLabel>

          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/gif, image/png, image/jpeg"
            onChange={onHandleImageChange}
            required
          />
        </div>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default BookForm;

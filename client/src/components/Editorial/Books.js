import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  CardMedia
} from '@material-ui/core';
import { AppContext } from '../../Context';
import Nav from './Nav';

const StyledBooks = styled.div`
  display: grid;
  width: 70vw;
  margin-left: 15vw;
  margin-right: 15vw;
  margin-top: 2vw;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px;
  
`;

const StyledBook = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;

const Books = ({ history, match }) => {
  const [books, setBooks] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const context = useContext(AppContext);

  useEffect(() => {
    fetchBooks();
    console.log(quantity);
  }, [quantity]);

  const fetchBooks = async () => {
    const { category } = match.params;
    try {
      if (category !== undefined) {
        const response = await fetch(
          `https://predde.herokuapp.com/api/books/category/${category}`
        );
        const booksArray = await response.json();
        setBooks(booksArray);
      } else {
        const response = await fetch('https://predde.herokuapp.com/api/books');
        const booksArray = await response.json();
        setBooks(booksArray);
      }
    } catch (error) {}
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

  const onQuantityChange = ({ target }, bookId) => {
    const booksQuantity = quantity;
    booksQuantity[bookId] = parseInt(target.value);
    setQuantity(booksQuantity);
  };

  return (
    <>
      <Nav handleOnChange={handleOnChange} />
      <StyledBooks >
        {Object.keys(books).map(book => (
          <Card style={{ height: '300px'}}>
            <CardHeader title={books[book].name}/>
            <CardMedia
              image={`/books/${books[book].image}`}
              title={books[book].name}
              style={{ height: 0, paddingTop: '50%' }}
            />
            <CardContent
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            >
              <Typography component="p" >
                {`L. ${books[book].price.toFixed(2)}`}
              </Typography>
              <input
                style={{ width: '50px' }}
                type="number"
                onChange={event => onQuantityChange(event, books[book]._id)}
                min="1"
                pattern="[0-9]"
              />
            </CardContent>
            <CardActions
              style={{ display: 'flex', justifyItems: 'center',justifyContent: 'center' }}
              disableActionSpacing
            >
              <Button
              
                variant="contained"
                size="medium"
                color="primary"
                step="1"
                onClick={() =>
                  context.addToCart(
                    books[book],
                    parseInt(quantity[books[book]._id] || 1)
                  )
                }
              >Agregar al carrito
              </Button>
            </CardActions>
          </Card>
        ))}
      </StyledBooks>
    </>
  );
};

export default Books;

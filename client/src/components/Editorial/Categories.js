import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { CardContent, Card, CardActions, Typography } from '@material-ui/core';
import Nav from './Nav';

const StyledCategories = styled.div`
  display: grid;
  width: 1000px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  margin: 20px auto;
  min-width: 275px;
`;

const StyledCategory = styled.div`
  width: 200px;
  div {
    padding-left: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Categories = ({ history }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://predde.herokuapp.com/api/categories'
      );
      const categoriesList = await response.json();
      setCategories(categoriesList);
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

  const handleGetBooks = category => {
    history.push(`/editorial/libros/${category}`);
  };
  return (
    <>
      <Nav handleOnChange={handleOnChange} />
      <StyledCategories>
        {Object.keys(categories).map(category => (
          <StyledCategory
            key={category}
            onClick={() => handleGetBooks(categories[category]._id)}
          >
            <Card style={{ marginLeft: '20px' }}>
              <Typography variant="h5" component="h2">
                <p className="name">{categories[category].name}</p>
              </Typography>
              <Typography component="p">
                <p className="descrciption">
                  {categories[category].description}
                  {console.log(categories[category].description)}
                </p>
              </Typography>
            </Card>
          </StyledCategory>
        ))}
      </StyledCategories>
    </>
  );
};

export default Categories;

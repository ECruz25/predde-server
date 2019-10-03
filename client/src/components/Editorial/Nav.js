import React, { useContext } from 'react';
import { Menu, Icon } from 'antd';
import { AppContext } from '../../Context';

const { SubMenu } = Menu;

const Nav = ({ handleOnChange }) => {
  const context = useContext(AppContext);
  const handleChange = (e, value) => {
    handleOnChange(
      value === 0
        ? 'categorias'
        : value === 1
        ? 'libros'
        : value === 2
        ? 'carrito'
        : 'login'
    );
  };
  return (
    <AppBar
      style={{
        display: 'flex',
        marginBottom: '200px',
        justifyContent: 'center',
        height: '72px'
      }}
    >
      <Tabs onChange={handleChange}>
        <Tab label="Categorias" />
        <Tab label="Libros" />
        {context.state.total > 0 && (
          <Tab
            label={context.state.total}
            icon={<Icon type="shopping-cart" />}
          />
        )}
      </Tabs>
    </AppBar>
  );
};
export default Nav;

import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  CardActions,
  TextField,
  FormLabel
} from '@material-ui/core';
import styled from 'styled-components';
import { AppContext } from '../../Context';
import Nav from './Nav';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const client = {
  sandbox:
    'AQ-1Nvfl1nklh5yp8BaxS-O95m_EmB_GQ9MAgxNbOOBSMyMY_QiIB9GCxBT_E7PmpL1mVhG6t5wztruQ',
  production:
    'AQ-1Nvfl1nklh5yp8BaxS-O95m_EmB_GQ9MAgxNbOOBSMyMY_QiIB9GCxBT_E7PmpL1mVhG6t5wztruQ'
};

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

const StyledCart = styled.div`
  margin-left: 30px;
  margin-right: 60px;
  .cart {
    display: grid;
    grid-template-columns: 75% 25%;
    grid-column-gap: 30px;
  }
`;

const Cart = ({ history }) => {
  const context = useContext(AppContext);
  const [total, setTotal] = useState({ total: 0, totalItems: 0 });
  const [paid, setPaid] = useState(false);
  useEffect(() => {
    getTotal();
  }, [context]);

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

  const onCancel = data => console.log('Cancelled payment!', data);

  const getTotal = async () => {
    const { cart } = context.state;
    const response = await fetch(
      'http://data.fixer.io/api/latest?access_key=53fbbdf9c79710141eef0728c7418b47&base=USD'
    );
    const data = await response.json();
    console.log(data);
    const totalized = {
      total: Object.keys(cart)
        .map(key => cart[key].quantity * cart[key].price)
        .reduce((a, b) => a + b, 0),
      totalItems: Object.keys(cart)
        .map(key => cart[key].quantity)
        .reduce((a, b) => a + b, 0)
    };
    setTotal(totalized);
  };

  const onPaymentSucces = response => {
    setPaid(response.paid);
    const request = {};
    debugger;
  };

  return (
    <StyledCart>
      <Nav handleOnChange={handleOnChange} />
      {Object.keys(context.state.cart).length > 0 ? (
        <div className="cart" id="style-1">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Libro</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio Unitario</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Remover</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(context.state.cart).map(
                  key =>
                    context.state.cart[key].quantity > 0 && (
                      <TableRow>
                        <TableCell>{context.state.cart[key].name}</TableCell>
                        <TableCell>
                          {context.state.cart[key].quantity}
                        </TableCell>
                        <TableCell>{`L. ${context.state.cart[key].price.toFixed(
                          2
                        )}`}</TableCell>
                        <TableCell>{`L. ${(
                          context.state.cart[key].quantity *
                          context.state.cart[key].price
                        ).toFixed(2)}`}</TableCell>

                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              context.addToCart(
                                context.state.cart[key],
                                context.state.cart[key].quantity * -1
                              )
                            }
                          >
                            Remover
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </Paper>
          <Paper>
            <h3 style={{ margin: '20px' }}>Información de la orden</h3>
            <form
              action=""
              style={{
                display: 'grid',
                padding: '20px',
                gridGap: '10px',
                justifyContent: 'center'
              }}
            >
              <TextField
                type="text"
                name="name"
                id="name"
                variant="outlined"
                label="Nombre"
                required
              />
              <TextField
                type="text"
                name="shippingCity"
                id="shippingCity"
                variant="outlined"
                label="Ciudad"
                required
              />
              <TextField
                type="textArea"
                name="direccion"
                id="direccion"
                variant="outlined"
                label="Dirección"
                required
              />
              <TextField
                type="number"
                name="number"
                id="number"
                variant="outlined"
                label="Número de contacto"
                maxlength="8"
                size="8"
                required
              />
              <TextField
                type="email"
                name="email"
                id="email"
                variant="outlined"
                label="Correo electrónico"
                required
              />
            </form>
            <Card>
              <CardHeader
                title={`Subtotal (${total.totalItems} libro${
                  total.totalItems > 1 ? 's' : ''
                }): L. ${total.total.toFixed(2)}`}
              />
              <CardActions>
                {total && total.total > 0 && !paid ? (
                  <PaypalExpressBtn
                    client={client}
                    currency={'USD'}
                    total={total.total.toFixed(2)}
                    onSuccess={onPaymentSucces}
                    disable={true}
                    disabled={true}
                  />
                ) : (
                  <h1>Hemos recibido su pago</h1>
                )}
              </CardActions>
            </Card>
          </Paper>
        </div>
      ) : (
        <div>Carrito vacio</div>
      )}
    </StyledCart>
  );
};

export default Cart;

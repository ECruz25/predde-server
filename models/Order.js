const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const orderSchema = new Schema({
  paypalPaymentId: {
    required: true,
    type: String
  },
  paypayPayerId: {
    required: true,
    type: String
  },
  isBillingAddressSameASbilling: {
    required: true,
    type: Boolean
  },
  shippingCity: {
    required: true,
    type: String
  },
  shippingLine: {
    required: true,
    type: String
  },
  shippingPostalCode: {
    required: true,
    type: String
  },
  shippingState: {
    required: true,
    type: String
  },
  billingCity: {
    required: true,
    type: String
  },
  billingCountry: {
    required: true,
    type: String
  },
  billingLine: {
    required: true,
    type: String
  },
  billingPostalCode: {
    required: true,
    type: String
  },
  billingState: {
    required: true,
    type: String
  },
  shippingName: {
    required: true,
    type: String
  },
  phoneNumber: {
    required: true,
    type: String,
    max: 8
  },
  email: {
    required: true,
    type: String
  }
});

module.exports = model('Order', orderSchema);

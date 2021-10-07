/**
 * CLIP-CHALLENGE - API Service.
 * Copyright 2021 androidexj9, Inc.
 *
 * Functions for clip-challenge-api endpoint.
 *
 * @author @androidexj9
 * @version 1.0
 *
 */

// Constants
const axios = require("axios");
const CLIP_CHALLENGE_SERVICE = {};

// TODO: Just For Testing
// require("dotenv").config();

// MICROSERVICE - HEROKU - CLIP_CHALLENGE_SERVICE_URI
const CLIP_CHALLENGE_SERVICE_URI = process.env.CLIP_CHALLENGE_SERVICE_URI;
console.debug(`clip-challenge-api.service - CLIP_CHALLENGE_SERVICE_URI: ${CLIP_CHALLENGE_SERVICE_URI}`);

// CLIP_CHALLENGE_WEB_TOKEN_CLIENT & SECRET
const CLIP_CHALLENGE_WEB_TOKEN_CLIENT = process.env.CLIP_CHALLENGE_WEB_TOKEN_CLIENT;
const CLIP_CHALLENGE_WEB_TOKEN_SECRET = process.env.CLIP_CHALLENGE_WEB_TOKEN_SECRET;

const token = `${CLIP_CHALLENGE_WEB_TOKEN_CLIENT}:${CLIP_CHALLENGE_WEB_TOKEN_SECRET}`;
const authorization_token = Buffer.from(token).toString("base64");
console.debug("authorization_token-->", authorization_token);

/********************************************************/

// Operation: Login - POST /api/v1/login
CLIP_CHALLENGE_SERVICE.login = (data) => {
  var qs = require("qs");

  return axios({
    method: "POST",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/login`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authorization_token}`,
    },
    data: qs.stringify(data),
  });
};

/********************************************************/

// Operation: Get ALL CUSTOMERS - GET/api/v1/customers
CLIP_CHALLENGE_SERVICE.getAllCustomers = () => {
  return axios({
    method: "GET",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/customers`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

// Operation: Get CUSTOMER by ID - GET/api/v1/customers/{id}
CLIP_CHALLENGE_SERVICE.getCustomerById = (id) => {
  return axios({
    method: "GET",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/customers/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

// Operation; Create CUSTOMER - POST /api/v1/customers
CLIP_CHALLENGE_SERVICE.createCustomer = (data) => {
  return axios({
    method: "POST",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/customers`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

// Operation: Update CUSTOMER - PUT /api/v1/customers
CLIP_CHALLENGE_SERVICE.updateCustomer = (data) => {
  return axios({
    method: "PUT",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/customers/${data.id}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

// Operation: Delete CUSTOMER - DELETE /api/v1/customers/{id}
CLIP_CHALLENGE_SERVICE.deleteCustomer = (id) => {
  return axios({
    method: "DELETE",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/customers/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

/********************************************************/

// Operation: Get ALL PRODUCTS - GET/api/v1/products
CLIP_CHALLENGE_SERVICE.getAllProducts = () => {
  return axios({
    method: "GET",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/products`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

// Operation: Get PRODUCT by ID - GET/api/v1/products/{id}
CLIP_CHALLENGE_SERVICE.getProductById = (id) => {
  return axios({
    method: "GET",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/products/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

// Operation; Create PRODUCT - POST /api/v1/products
CLIP_CHALLENGE_SERVICE.createProduct = (data) => {
  return axios({
    method: "POST",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/products`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

// Operation: Update PRODUCT - PUT /api/v1/products
CLIP_CHALLENGE_SERVICE.updateProduct = (data) => {
  return axios({
    method: "PUT",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/products/${data.id}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

// Operation: Delete PRODUCT - DELETE /api/v1/products/{id}
CLIP_CHALLENGE_SERVICE.deleteProduct = (id) => {
  return axios({
    method: "DELETE",
    url: `${CLIP_CHALLENGE_SERVICE_URI}/v1/products/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization_token}`,
    },
  });
};

module.exports = CLIP_CHALLENGE_SERVICE;

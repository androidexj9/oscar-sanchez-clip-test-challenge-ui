/**
 * CLIP-CHALLENGE - Admin Routes.
 * Copyright 2021 androidexj9, Inc.
 *
 * General functions for admin.routes.js
 *
 * @author @androidexj9
 * @version 1.0
 *
 */

// Constants
const express = require("express");
const router = express.Router();
const path = require("path");

// CLIP-CHALLENGE Auth Helper
const { isAdmin } = require("../helpers/auth.helper");

// CLIP-CHALLENGE Admin Controller
const {
  renderIndex,
  renderCustomerList,
  renderAddCustomerForm,
  addCustomer,
  renderEditCustomerForm,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/admin.controller");

// CLIP-CHALLENGE - Admin - Index
router.get("/", isAdmin, renderIndex);

// CLIP-CHALLENGE - Admin - Customers - Render Customer List
router.get("/customer", isAdmin, renderCustomerList);

// CLIP-CHALLENGE - Admin - Customers - Render Add Customer Form
router.get("/customer/add", isAdmin, renderAddCustomerForm);

// CLIP-CHALLENGE - Admin - Customers - Add Customer
router.post("/customer/add", isAdmin, addCustomer);

// CLIP-CHALLENGE - Admin - Customers - Render Edit Customer Form
router.get("/customer/edit/:id", isAdmin, renderEditCustomerForm);

// CLIP-CHALLENGE - Admin - Customers - Edit Customer
router.put("/customer/edit/:id", isAdmin, updateCustomer);

// CLIP-CHALLENGE - Admin - Customers - Delete Customer
router.get("/customer/delete/:id", isAdmin, deleteCustomer);

module.exports = router;
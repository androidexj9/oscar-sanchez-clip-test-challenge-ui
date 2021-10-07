/**
 * CLIP-CHALLENGE - Admin Controller.
 * Copyright 2021 androidexj9, Inc.
 *
 * General functions for admin.controller.js
 *
 * @author @androidexj9
 * @version 1.0
 *
 */

// CLIP-CHALLENGE Admin Controller
const ADMIN_CONTROLLER = {};

// CREATE_USER_ENCRYPTION_ENABLED FLAG
const CREATE_USER_ENCRYPTION_ENABLED =
  process.env.CREATE_USER_ENCRYPTION_ENABLED;

// UPDATE_USER_ENCRYPTION_ENABLED FLAG
const UPDATE_USER_ENCRYPTION_ENABLED =
  process.env.UPDATE_USER_ENCRYPTION_ENABLED;

// CLIP-CHALLENGE API Servcie
const AT_SCE_API_SERVICE = require("../services/clip-challenge-api.service");

// CLIP-CHALLENGE Auth Helper
const { encrypt } = require("../helpers/auth.helper");

// CLIP-CHALLENGE - Admin - Index
ADMIN_CONTROLLER.renderIndex = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.renderIndex");
  res.render("admin/index");
};

// CLIP-CHALLENGE - Admin - Customers - Render Customer List
ADMIN_CONTROLLER.renderCustomerList = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.renderCustomerList");
  let users = [];

  try {
    const responseCustomerList = await AT_SCE_API_SERVICE.getAllCustomers();
    if (responseCustomerList === null || responseCustomerList === undefined) {
      console.error("Service unavailable: AT_SCE_API_SERVICE.getAllCustomers()");
      req.flash("error_msg", "Service unavailable");
    } else {
      users = responseCustomerList.data;
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    res.render("admin/user/index", { users });
  }
};

// CLIP-CHALLENGE - Admin - Customers - Render Add Customer Form
ADMIN_CONTROLLER.renderAddCustomerForm = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.renderAddCustomerForm");
  res.render("admin/user/add-user");
};

// CLIP-CHALLENGE - Admin - Customers - Add Customer
ADMIN_CONTROLLER.addCustomer = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.addCustomer");

  try {
    const {
      user_type,
      user_firstName,
      user_lastName,
      user_email,
      user_password,
      user_status,
    } = req.body;
    const userErrors = [];

    // Validations
    if (!user_type) {
      userErrors.push({ text: "Please Enter a Type." });
    }
    if (!user_firstName) {
      userErrors.push({ text: "Please Type a First Name." });
    }
    if (!user_lastName) {
      userErrors.push({ text: "Please Type a Last Name." });
    }
    if (!user_email) {
      userErrors.push({ text: "Please Type an Email." });
    }
    if (!user_password) {
      userErrors.push({ text: "Please Type a Password." });
    }
    if (!user_status) {
      userErrors.push({ text: "Please Enter a Status." });
    }

    if (userErrors.length > 0) {
      console.debug("--> ADMIN_CONTROLLER.addCustomer - Validations error");
      res.render("admin/user/add-user", {
        userErrors,
        user_firstName,
        user_lastName,
        user_password,
        user_email,
        user_status,
      });
    }

    // Request
    let request = {
      type: parseInt(user_type),
      firstName: user_firstName,
      lastName: user_lastName,
      email: user_email,
      password:
        CREATE_USER_ENCRYPTION_ENABLED == "true"
          ? (await encrypt(user_password)).content
          : user_password,
      status: parseInt(user_status),
    };
    console.debug("admin.controller.js - addCustomer - request-->", request);

    // Call Create USER - POST /api/v1/users endpoint
    await AT_SCE_API_SERVICE.createCustomer(request).then((result) => {
      if (!result) {
        console.error("Service unavailable: AT_SCE_API_SERVICE.createCustomer()");
        req.flash("error_msg", "Service unavailable");
        res.redirect("/admin/user");
      }
      console.debug("admin.controller.js - addCustomer - Result-->", result);
    });

    // Redirect
    req.flash("success_msg", "Customer created successfully");
    res.redirect("/admin/user");
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.data) {
      let errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
    res.redirect("/admin/user");
  }
};

// CLIP-CHALLENGE - Admin - Customers - Render Edit Customer Form
ADMIN_CONTROLLER.renderEditCustomerForm = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.renderEditCustomerForm", req.params.id);
  let user = [];

  try {
    const responseCustomerbyId = await AT_SCE_API_SERVICE.getCustomerById(
      req.params.id
    );
    if (!responseCustomerbyId) {
      console.error("Service unavailable: AT_SCE_API_SERVICE.getCustomerById()");
      req.flash("error_msg", "Service unavaible");
    } else {
      user = responseCustomerbyId.data;
      console.debug(
        "admin.controller.js - renderEditCustomerForm -",
        JSON.stringify(responseCustomerbyId.data)
      );
    }
  } catch (err) {
    console.err("admin.controller.js - renderEditCustomerForm -", err.message);
  } finally {
    res.render("admin/user/edit-user", { user });
  }
};

// CLIP-CHALLENGE - Admin - Customers - Edit Customer
ADMIN_CONTROLLER.updateCustomer = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.updateCustomer");

  const user_id = req.params.id;
  console.debug("admin.controller.js - updateCustomer - user id-->" + user_id);

  if (!user_id) {
    req.flash("error_msg", "Customer Not Authorized");
    return res.redirect("/admin/user");
  }

  try {
    const {
      user_type,
      user_firstName,
      user_lastName,
      user_email,
      user_password,
      user_status,
    } = req.body;
    const userErrors = [];

    // Validations
    if (!user_type) {
      userErrors.push({ text: "Please type a Type." });
    }
    if (!user_firstName) {
      userErrors.push({ text: "Please type a FirstName." });
    }
    if (!user_lastName) {
      userErrors.push({ text: "Please type a LastName." });
    }
    if (!user_email) {
      userErrors.push({ text: "Please type a Email." });
    }
    if (!user_status) {
      userErrors.push({ text: "Please type a Status." });
    }

    if (userErrors.length > 0) {
      console.debug("--> ADMIN_CONTROLLER.updateCustomer - Validations error");
      res.render("admin/user/edit-user", {
        userErrors,
        user_id,
        user_type,
        user_firstName,
        user_lastName,
        user_email,
        user_status,
      });
    }

    // Request
    let request = {
      id: user_id,
      type: parseInt(user_type),
      firstName: user_firstName,
      lastName: user_lastName,
      email: user_email,
      password:
        UPDATE_USER_ENCRYPTION_ENABLED == "true"
          ? (await encrypt(user_password)).content
          : user_password,
      status: parseInt(user_status),
    };
    console.debug("admin.controller.js - updateCustomer - Request-->", request);

    // Call Update USER - PUT /api/v1/users endpoint
    await AT_SCE_API_SERVICE.updateCustomer(request).then((result) => {
      if (!result) {
        console.error("Service unavailable: AT_SCE_API_SERVICE.updateCustomer()");
        req.flash("error_msg", "Service unavailable");
        res.redirect("/admin/user");
      }
      console.debug("Result-->", result);
    });

    // Redirect
    req.flash("success_msg", "Customer Updated Successfully");
    res.redirect("/admin/user");
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.data) {
      let errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
    res.redirect("/admin/user");
  }
};

// CLIP-CHALLENGE - Admin - Customers - Delete Customer
ADMIN_CONTROLLER.deleteCustomer = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.deleteCustomer");

  const user_id = req.params.id;
  console.debug("admin.controller.js - deleteCustomer - user_id-->", user_id);

  try {
    const response = await AT_SCE_API_SERVICE.deleteCustomer(user_id);
    if (!response) {
      console.error("Service unavailable: AT_SCE_API_SERVICE.deleteCustomer()");
      req.flash("error_msg", "Service unavailable");
      es.redirect("/admin/user");
    }
  } catch (err) {
    if (err.response && err.response.data) {
      let errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
    res.redirect("/admin/user");
  } finally {
    // Redirect
    req.flash("success_msg", "Customer Deleted Successfully");
    res.redirect("/admin/user");
  }
};

module.exports = ADMIN_CONTROLLER;

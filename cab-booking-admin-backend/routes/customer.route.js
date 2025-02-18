import express from 'express'
import { deleteCustomer, getAllCustomer, getCustomerById, getCustomerCount } from '../contollers/customer.controller.js';

const router = express.Router();

router.route("/getallcustomer").get(getAllCustomer);
router.route("/count").get(getCustomerCount);
router.route("/deletecustomer").delete(deleteCustomer);
router.route("/getcustomerbyid").post(getCustomerById);

export default router;
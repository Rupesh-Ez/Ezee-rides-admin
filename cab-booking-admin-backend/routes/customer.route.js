import express from 'express'
import { getAllCustomer, getCustomerCount } from '../contollers/customer.controller.js';

const router = express.Router();

router.route("/getallcustomer").get(getAllCustomer);
router.route("/count").get(getCustomerCount);

export default router;
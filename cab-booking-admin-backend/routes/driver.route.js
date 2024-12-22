import express from 'express'
import { getDriverById, getAllDrivers, getDriverDocs, updateVerificationStatuses, getDriverCount } from '../contollers/driver.controller.js';

const router = express.Router();

router.route("/getalldrivers").get(getAllDrivers);
router.route("/getdriverbyid/:id").get(getDriverById);
router.route("/document/:id").get(getDriverDocs);
router.route("/update/:id").post(updateVerificationStatuses);
router.route("/count").get(getDriverCount);

export default router;
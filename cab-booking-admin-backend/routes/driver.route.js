import express from 'express'
import { getDriverById, getAllDrivers, getDriverDocs, updateVerificationStatuses, getDriverCount, deleteDriver, getOnlineDrivers } from '../contollers/driver.controller.js';

const router = express.Router();

router.route("/getalldrivers").get(getAllDrivers);
router.route("/get-online-drivers").get(getOnlineDrivers);
router.route("/getdriverbyid/:id").get(getDriverById);
router.route("/document/:id").get(getDriverDocs);
router.route("/update/:id").post(updateVerificationStatuses);
router.route("/count").get(getDriverCount);
router.route("/deletedriver").delete(deleteDriver);

export default router;
import express from 'express'
import { getAllRides, getExcelReport, getLatestRides, getRideCount } from '../contollers/ride.controller.js';

const router = express.Router();

router.route("/getallrides").get(getAllRides);
router.route("/getlatestrides").get(getLatestRides);
router.route("/count").get(getRideCount);
router.route("/export-excel").get(getExcelReport);

export default router;
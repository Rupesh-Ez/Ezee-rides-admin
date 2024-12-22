import express from 'express'
import { getAllRides, getLatestRides, getRideCount } from '../contollers/ride.controller.js';

const router = express.Router();

router.route("/getallrides").get(getAllRides);
router.route("/getlatestrides").get(getLatestRides);
router.route("/count").get(getRideCount);

export default router;
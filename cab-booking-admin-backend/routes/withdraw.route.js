import express from 'express'
import {  getAllWithdrawals, getMonthlyEarnings, getMonthWiseEarnings, getTotalEarnings, getWithdrawCount, updateRequest } from '../contollers/withdraw.controller.js';

const router = express.Router();

router.route("/getallwithdraws").get(getAllWithdrawals);
router.route("/updaterequest/:id").post(updateRequest);
router.route("/count").get(getWithdrawCount);
router.route("/monthlyearnings").get(getMonthlyEarnings);
router.route("/totalearnings").get(getTotalEarnings);
router.route("/monthwiseearnings").get(getMonthWiseEarnings);

export default router;
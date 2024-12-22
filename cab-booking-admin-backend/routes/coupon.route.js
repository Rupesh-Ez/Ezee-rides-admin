import express from 'express'
import { deleteCoupon, getAllCoupons, getCouponById, getCouponCount, saveCoupon, updateCoupon } from '../contollers/coupon.controller.js';

const router = express.Router();

router.route("/savecoupon").post(saveCoupon);
router.route("/getallcoupons").get(getAllCoupons);
router.route("/deletecoupon").delete(deleteCoupon);
router.route("/getcouponbyid").post(getCouponById);
router.route("/updatecoupon/:id").post(updateCoupon);
router.route("/count").get(getCouponCount);

export default router;
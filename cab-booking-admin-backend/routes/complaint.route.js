import express from 'express'
import { deleteComplaint, getAllComplaints, getComplaintById, getComplaintCount, updateComplaint } from '../contollers/complaint.controller.js';

const router = express.Router();

router.route("/getallcomplaint").get(getAllComplaints);
router.route("/deletecomplaint").delete(deleteComplaint);
router.route("/getcomplaintbyid").post(getComplaintById);
router.route("/updatecomplaint/:id").post(updateComplaint);
router.route("/count").get(getComplaintCount);

export default router;
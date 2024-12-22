import express from 'express'
import { createService, deleteService, getAllService, getServiceById, updateService } from '../contollers/service.controller.js';

const router = express.Router();

router.route("/createservice").post(createService);
router.route("/getallservice").get(getAllService);
router.route("/deleteservice").delete(deleteService);
router.route("/getservicebyid").post(getServiceById);
router.route("/updateservice/:id").post(updateService);

export default router;
import express from 'express'
import { deleteNotification, getAllNotifications, saveNotification, updateNotification } from '../contollers/pushnotification.controller.js';

const router = express.Router();

router.route("/create").post(saveNotification);
router.route("/getallnotification").get(getAllNotifications);
router.route("/delete").delete(deleteNotification);
router.route("/update/:id").post(updateNotification);

export default router;
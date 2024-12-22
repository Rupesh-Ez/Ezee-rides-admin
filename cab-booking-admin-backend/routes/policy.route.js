import express from 'express'
import { getPolicy, savePolicy } from '../contollers/policy.controller.js';

const router = express.Router();

router.route("/savepolicy").post(savePolicy);
router.route("/getpolicy").get(getPolicy);

export default router;
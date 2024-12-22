import express from 'express'
import { getTerms, saveTerms } from '../contollers/terms.controller.js';
const router = express.Router();

router.route("/saveterms").post(saveTerms);
router.route("/getterms").get(getTerms);

export default router;
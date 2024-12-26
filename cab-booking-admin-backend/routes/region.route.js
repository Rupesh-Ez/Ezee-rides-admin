import express from 'express'
import { getAllRegions, saveRegion, deleteRegion, updateRegion, getRegioncity, getRegionById, updateRegionById } from '../contollers/region.controller.js';

const router = express.Router();

router.route("/saveregion").post(saveRegion);
router.route("/getallregions").get(getAllRegions);
router.route("/deleteregion").delete(deleteRegion);
router.route("/update/:id").post(updateRegion);
router.route("/getregioncity").get(getRegioncity);
router.route("/getregionbyid").post(getRegionById);
router.route("/updateregion/:id").post(updateRegionById);

export default router;
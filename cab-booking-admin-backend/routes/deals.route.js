import express from 'express';
import { saveDeal, getAllDeals, deleteDeal } from '../contollers/deals.controller.js';

const router = express.Router();

router.post('/addDeal', saveDeal);
router.get('/get-all-deals', getAllDeals);
router.delete('/delete', deleteDeal);

export default router;

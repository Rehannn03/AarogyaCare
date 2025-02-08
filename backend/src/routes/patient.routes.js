import express from 'express';
import {
    scheduleAppointment,
    viewAppointments,
    addReports,
    viewReports,
    viewConsultations
} from '../controllers/patient.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { pinataUpload } from '../middleware/multer.middleware.js';
const router=express.Router();

router.post('/scheduleAppointment',verifyJWT,scheduleAppointment)
router.get('/viewAppointments',verifyJWT,viewAppointments)
router.post('/addReports',verifyJWT,upload.single('report'),addReports)
router.get('/viewReports',verifyJWT,viewReports)
router.get('/viewConsultations',verifyJWT,viewConsultations)
export default router;
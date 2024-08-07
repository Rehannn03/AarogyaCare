import express from 'express';
import {
    updateInfo,
    getDoctor,
    getAppointments,
    updateAppointment,
    fillConsultation,
    getSpecialistCount,
    activateAppointment,
    earnings
} from '../controllers/doctor.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/updateInfo',verifyJWT,updateInfo)
router.get('/getDoctor',verifyJWT,getDoctor)
router.get('/getAppointments',verifyJWT,getAppointments)
router.patch('/updateAppointment',verifyJWT,updateAppointment)
router.post('/fillConsultation',verifyJWT,fillConsultation)
router.get('/getSpecialistCount',verifyJWT,getSpecialistCount)
router.patch('/activateAppointment',verifyJWT,activateAppointment)
router.get('/earnings',verifyJWT,earnings)
export default router;
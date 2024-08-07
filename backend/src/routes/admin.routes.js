import {
    verifyDoctor,
    getAllEarnings,
    getAllDoctors,
    getAllpatients,
    getAllAppointments
} from '../controllers/admin.controller.js'
import express from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/verify-doctor',verifyJWT,verifyDoctor)
router.get('/earnings',verifyJWT,getAllEarnings)
router.get('/getDoctors',verifyJWT,getAllDoctors)
router.get('/getPatients',verifyJWT,getAllpatients)
router.get('/getAppointments',verifyJWT,getAllAppointments)
export default router

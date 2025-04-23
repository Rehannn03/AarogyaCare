import {
    verifyDoctor,
    getAllEarnings,
    getAllDoctors,
    getAllpatients,
    getAllAppointments,
    symptoms,
    dailyAppointments,
    demographics,
    deleteDoctor,
    dashboardStats,
    getRecentDoctors
} from '../controllers/admin.controller.js'
import express from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/verify-doctor',verifyJWT,verifyDoctor)
router.get('/earnings',verifyJWT,getAllEarnings)
router.get('/getDoctors',verifyJWT,getAllDoctors)
router.get('/getPatients',verifyJWT,getAllpatients)
router.get('/getAppointments',verifyJWT,getAllAppointments)
router.get('/symptoms',verifyJWT,symptoms)
router.get('/daily-appointments',verifyJWT,dailyAppointments)
router.get('/demographics',verifyJWT,demographics)
router.delete('/delete-doctor/:id',verifyJWT,deleteDoctor)
router.get('/dashboard-stats',verifyJWT,dashboardStats)
router.get('/recent-doctors',verifyJWT,getRecentDoctors)
export default router

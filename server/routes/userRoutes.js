import express from 'express'
import upload from '../config/multer.js'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'

const router = express.Router()

// get user data
router.get('/user', getUserData)


// apply for a job
router.post('/apply', applyForJob)

// get applied jobsdata
router.get('/applications',getUserJobApplications)

// update user profile(resume)
router.post('/update-resume', upload.single('resume'),updateUserResume)


export default router
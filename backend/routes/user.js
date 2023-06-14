import express  from 'express';
const router = express.Router()
import * as userController from "../controllers/userController.js"
import { userAuthentication } from '../middlewares/authMIddlewares.js';
import uploadProfilePic from '../middlewares/multer.js'

router.post('/register',userController.registerUser)
router.post('/login',userController.loginVerify)
router.get('/getUser',userAuthentication,userController.getUser)
router.post('/set-profie-pic',userAuthentication,uploadProfilePic,userController.setProfilePic)


export default router




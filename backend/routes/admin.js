import {Router} from 'express'
const router = Router()
import * as adminController from '../controllers/adminCont.js'
import { adminAuthentication } from '../middlewares/authMIddlewares.js'


router.post('/login',adminController.verifyLogin)
router.get('/get-users',adminAuthentication,adminController.getAllUser)
router.post ('/add-user',adminAuthentication,adminController.addNewUser)
router.patch('/update-user/:id',adminAuthentication,adminController.editUser)
router.delete('/delete-user/:id',adminAuthentication,adminController.deleteUser)


export default router
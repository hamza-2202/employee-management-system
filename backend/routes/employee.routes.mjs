import express from 'express'
import {
    getAllEmployees,
    addEmployee,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee
} from '../controllers/employee.controllers.mjs'
import { upload } from '../middlewares/multer.middleware.mjs'
import { verifyToken } from "../middlewares/auth.middleware.mjs"

const router = express.Router()

router.use(verifyToken)
router.route("/").get(getAllEmployees).post(upload.single("image"), addEmployee)
router.route("/:id").get(getSingleEmployee).put(upload.single("image"), updateEmployee).delete(deleteEmployee)

export default router;
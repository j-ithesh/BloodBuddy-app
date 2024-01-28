const express = require ('express')
const { getDonarsListController, getHospitalListController, getOrgListController, deleteDonarController } = require('../controllers/adminController')
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();


router.get('/donar-list', authMiddleware,adminMiddleware, getDonarsListController)
router.get('/hospital-list', authMiddleware,adminMiddleware, getHospitalListController)
router.get('/org-list', authMiddleware,adminMiddleware, getOrgListController)

router.delete('/delete-donar/:id', authMiddleware,adminMiddleware, deleteDonarController)



module.exports = router
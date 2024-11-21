import express from 'express';
const router = express.Router();
import authRoute from './auth'
import adminRoute from './adminRoute';

router.use('/admin/auth', authRoute);
router.use('/admin', adminRoute);


export default router;

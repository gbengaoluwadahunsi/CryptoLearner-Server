
import express from 'express';
import {admin, getAdmin} from '../controllers/admin.js'

const router = express.Router();



router.get('/' ,  getAdmin);

//Admin verification route
router.post('/emails', admin);



export default router;

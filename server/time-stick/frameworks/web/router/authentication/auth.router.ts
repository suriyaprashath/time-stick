import express from 'express';
import AuthController from '../../../../controllers/authentication/auth.controller';

const router = express.Router();

router.post('/initiate', AuthController.initiate);
router.get('/redirect', AuthController.getTokens);

export default router;
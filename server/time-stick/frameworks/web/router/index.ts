// create a router middleware using esmodule import
import express from 'express';
import authRouter from './authentication/auth.router';
import projectRouter from './projects/projects.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api/v1/projects', projectRouter)

export default router;
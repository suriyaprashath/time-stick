import express from 'express';
import ProjectsController from '../../../../controllers/projects/projects.controller';
import { attachPortalId } from '../../middleware/projects.middleware';

const router = express.Router();

router.use(attachPortalId);

router.get('/', ProjectsController.getProjects);

export default router;
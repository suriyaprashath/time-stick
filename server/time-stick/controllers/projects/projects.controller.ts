import { Request, Response } from "express";
import Projects from "../../use-cases/projects/ZohoProjects";
import { AuthProvider } from "../../use-cases/authentication/AuthFactory";

class ProjectsController {
  static async getProjects(req: Request, res: Response): Promise<void> {
    const firstPortalId = req.portals?.[0]?.id;

    if (req.query['provider'] === AuthProvider.ZOHO) {
      if(!firstPortalId) {
        res.status(404).send('No portal found to retrieve projects from.');
  
        return;
      }

      const zohoProjects = new Projects(firstPortalId, req.session.accessToken);

      try {
        const projects = await zohoProjects.getProjects();

        res.send(projects);
        return;
      } catch (error) {
        res.status(500).send('Error fetching projects from Zoho Projects API');

        return;
      }
    }

    res.status(400).send('Provider not supported.');
  }
}

export default ProjectsController;
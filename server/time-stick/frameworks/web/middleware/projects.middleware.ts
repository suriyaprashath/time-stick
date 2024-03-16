import { NextFunction, Request, Response } from 'express';
import { AuthProvider } from '../../../use-cases/authentication/AuthFactory';
import ZohoHelpers from '../../../use-cases/projects/ZohoHelpers';

async function attachPortalId(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  switch (req.query['provider']) {
    case AuthProvider.ZOHO:
      try {
        const zohoHelpers = new ZohoHelpers(req.session.accessToken);
        const portals = await zohoHelpers.getPortals();

      (req as any).portals = portals;

        next();
      } catch (error) {
        console.error('Error retrieving portals');

        res.status(500).send('Error retrieving portals');
        return;
      }
      break;

      default:
        next();
  }
}

export { attachPortalId };

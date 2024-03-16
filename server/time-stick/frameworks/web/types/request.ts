import { Portal } from "../../../use-cases/projects/ZohoHelpers";

declare module 'express-serve-static-core' {
  interface Request {
    portals: Portal[];
  }
}
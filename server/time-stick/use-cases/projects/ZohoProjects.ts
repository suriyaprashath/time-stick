import axios from 'axios';
import { Project } from '../../entities/projects/Project';
import { ZOHO_API } from '../../config/api';

class ZohoProjects {
  portalId: string;
  authToken: string;

  constructor(portalId: string, authToken: string = '') {
    this.portalId = portalId;
    this.authToken = authToken;
  }

  async getProjects(): Promise<Project[]> {
    try {
      const response = await axios.get(
        `${ZOHO_API.prefix}/portal/${this.portalId}/projects/`,
        {
          headers: {
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );

      console.log(response.data);

      // const projects: Project[] = [];

      return response.data;
    } catch (error) {
      console.error('Error fetching projects from Zoho Projects API');
      throw error;
    }
  }
}

export default ZohoProjects;

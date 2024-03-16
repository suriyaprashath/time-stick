import axios from 'axios';
import { ZOHO_API } from '../../config/api';

export interface Portal {
  id: string;
}

class ZohoHelpers {
  private authToken: string;

  constructor(authToken: string = '') {
    this.authToken = authToken;
  }

  async getPortals(): Promise<Portal[]> {
    console.log(ZOHO_API);
    try {
      const response = await axios.get(`${ZOHO_API.prefix}/portals/`, {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      const portals = response.data.portals as Portal[];

      return portals;
    } catch (error) {
      console.error('Error retrieving portals');

      throw error;
    }
  }

  // Add more helper methods here for retrieving other necessary information
}

export default ZohoHelpers;

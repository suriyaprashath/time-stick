import axios from 'axios';
import OAuth, { TokenResponse } from './OAuth';

class ZohoAuth extends OAuth {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  protected scope = [
    'ZohoProjects.portals.ALL',
    'ZohoProjects.projects.ALL',
    'ZohoProjects.activities.ALL',
    'ZohoProjects.feeds.ALL',
    'ZohoProjects.status.ALL',
    'ZohoProjects.milestones.ALL',
    'ZohoProjects.tasklists.ALL',
    'ZohoProjects.tasks.ALL',
    'ZohoProjects.timesheets.ALL',
    'ZohoProjects.bugs.ALL',
    'ZohoProjects.events.ALL',
    'ZohoProjects.forums.ALL',
    'ZohoProjects.clients.ALL',
    'ZohoProjects.users.ALL',
    'ZohoProjects.documents.READ',
    'ZohoProjects.search.READ',
    'ZohoProjects.tags.ALL',
    'ZohoProjects.calendar.ALL',
    'ZohoProjects.integrations.ALL',
    'ZohoProjects.projectgroups.ALL',
    'ZohoProjects.entity_properties.ALL',
    'ZohoPC.files.ALL',
    'WorkDrive.workspace.ALL',
    'WorkDrive.files.ALL',
    'WorkDrive.team.ALL',
  ];
  private urlToGetTokens = 'https://accounts.zoho.com/oauth/v2/token';

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    super();
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  public getInitiationURL(): string {
    return `https://accounts.zoho.com/oauth/v2/auth?scope=${this.scope[0]},${this.scope[1]}&client_id=${this.clientId}&response_type=code&access_type=online&redirect_uri=${this.redirectUri}&prompt=consent`;
  }

  public async getTokens(code: string): Promise<TokenResponse> {
    try {
      const response = await axios.post(
        this.urlToGetTokens,
        {},
        {
          params: {
            code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            grant_type: 'authorization_code',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error('Failed to authenticate with Zoho');
    }
  }
}

export default ZohoAuth;

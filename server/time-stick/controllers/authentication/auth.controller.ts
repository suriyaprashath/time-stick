import { Request, Response } from 'express';
import { AuthFactory, AuthProvider } from '../../use-cases/authentication/AuthFactory';
import { TokenResponse } from '../../use-cases/authentication/OAuth';

class AuthController {
  static initiate(req: Request, res: Response): void {
    const auth = AuthFactory.createAuth(req.body.provider);
    const initiationURL = auth.getInitiationURL();

    res.send({
      url: initiationURL
    });
  }

  static async getTokens(req: Request, res: Response): Promise<void> {
    let auth;

    const authProvider = AuthController.getAuthProvider(req);
    
    req.session.authProvider = authProvider ?? '';
    if(authProvider) {
      auth = AuthFactory.createAuth(authProvider);
    }

    if (!auth) {
      res.status(400).send('Unsupported auth provider');
      return;
    }

    const tokens = await auth.getTokens(req.query['code'] as string);

    AuthController.storeTokensInSession(req, tokens)

    res.send(`
      <script>
        window.close();
      </script>
    `);
  }

  private static getAuthProvider(req: Request): AuthProvider | null {
    if ((req.query?.['accounts-server'] as string)?.includes('zoho')) {
      return AuthProvider.ZOHO;
    }

    return null;
  }

  private static storeTokensInSession(req: Request, tokens: TokenResponse) {
    req.session.accessToken = tokens.access_token;
    req.session.refreshToken = tokens.refresh_token;
    req.session.tokenType = tokens.token_type;
  }
}

export default AuthController;
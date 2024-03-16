import OAuth from './OAuth';
import ZohoAuth from './ZohoAuth';

enum AuthProvider {
  ZOHO = 'zoho',
}

class AuthFactory {
  static createAuth(authProvider: AuthProvider): OAuth {
    const clientId = process.env['CLIENT_ID'] || '';
    const clientSecret = process.env['CLIENT_SECRET'] || '';
    const redirectUrl = process.env['REDIRECT_URL'] || '';

    switch (authProvider) {
      case AuthProvider.ZOHO:
        return new ZohoAuth(clientId, clientSecret, redirectUrl);
      default:
        throw new Error(`Unsupported auth provider: ${authProvider}`);
    }
  }
}

export { AuthFactory, AuthProvider };
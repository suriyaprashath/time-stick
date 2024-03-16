export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  api_domain: string;
}

abstract class OAuth {
  protected abstract scope: string[];

  abstract getInitiationURL(): string;
  abstract getTokens(code: string): Promise<TokenResponse>;
}

export default OAuth;
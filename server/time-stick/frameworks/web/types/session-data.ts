declare module 'express-session' {
  interface SessionData {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    authProvider: string;
  }
}
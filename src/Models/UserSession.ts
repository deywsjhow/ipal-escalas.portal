export default interface UserSession {
    userId: number;
    user: string;
    email: string;
    attribuation: string;
    loginType: number;
    nameType: string;
    accessToken: string;
  }
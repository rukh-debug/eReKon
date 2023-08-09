export interface User {
  username: string;
  email: string;
  token: string;
  isAuthenticated?: boolean;
}
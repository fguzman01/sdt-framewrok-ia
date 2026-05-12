export interface LoginData {
  id: string;
  description: string;
  username: string;
  password: string;
  expectedError?: string;
  expectedUrl?: string;
}

export interface UserApiData {
  id: string;
  description: string;
  userId?: number;
  createPayload?: {
    name: string;
    job: string;
  };
  updatePayload?: {
    name?: string;
    job?: string;
  };
  expectedStatus: number;
}

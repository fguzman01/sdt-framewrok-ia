export interface CreateUserRequest {
  name: string;
  job: string;
}

export interface UpdateUserRequest {
  name?: string;
  job?: string;
}

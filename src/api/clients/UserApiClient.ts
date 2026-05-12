import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { CreateUserRequest, UpdateUserRequest } from '../models/requests/CreateUserRequest';

export class UserApiClient extends BaseApiClient {
  private readonly basePath = '/users';

  constructor(request: APIRequestContext) {
    super(request);
  }

  async getUsers(): Promise<APIResponse> {
    console.log('[UserApiClient] Obteniendo lista de usuarios');
    return this.get(this.basePath);
  }

  async getUserById(id: number): Promise<APIResponse> {
    console.log(`[UserApiClient] Obteniendo usuario id: ${id}`);
    return this.get(`${this.basePath}/${id}`);
  }

  async createUser(body: CreateUserRequest): Promise<APIResponse> {
    console.log(`[UserApiClient] Creando usuario: "${body.name}"`);
    return this.post(this.basePath, body);
  }

  async updateUser(id: number, body: UpdateUserRequest): Promise<APIResponse> {
    console.log(`[UserApiClient] Actualizando usuario id: ${id}`);
    return this.put(`${this.basePath}/${id}`, body);
  }

  async deleteUser(id: number): Promise<APIResponse> {
    console.log(`[UserApiClient] Eliminando usuario id: ${id}`);
    return this.delete(`${this.basePath}/${id}`);
  }
}

import { APIRequestContext } from '@playwright/test';
import { UserApiClient } from '../api/clients/UserApiClient';
import { UserResponse, CreateUserResponse, UpdateUserResponse, UserResponseSchema, CreateUserResponseSchema, UpdateUserResponseSchema } from '../api/models/responses/UserResponse';
import { CreateUserRequest, UpdateUserRequest } from '../api/models/requests/CreateUserRequest';

export class UserApiFlow {
  private readonly client: UserApiClient;

  constructor(request: APIRequestContext) {
    this.client = new UserApiClient(request);
  }

  async getUsers(): Promise<UserResponse[]> {
    console.log('[UserApiFlow] Iniciando flujo: listar usuarios');
    const response = await this.client.getUsers();
    const body = UserResponseSchema.array().parse(await response.json());
    console.log(`[UserApiFlow] Flujo completado: ${body.length} usuarios obtenidos`);
    return body;
  }

  async getUserById(id: number): Promise<{ status: number; body: UserResponse | null }> {
    console.log(`[UserApiFlow] Iniciando flujo: obtener usuario id ${id}`);
    const response = await this.client.getUserById(id);
    const status = response.status();

    if (status === 404) {
      console.log(`[UserApiFlow] Flujo completado: usuario id ${id} no encontrado`);
      return { status, body: null };
    }

    const body = UserResponseSchema.parse(await response.json());
    console.log(`[UserApiFlow] Flujo completado: usuario "${body.name}" obtenido`);
    return { status, body };
  }

  async createUser(payload: CreateUserRequest): Promise<{ status: number; body: CreateUserResponse }> {
    console.log(`[UserApiFlow] Iniciando flujo: crear usuario "${payload.name}"`);
    const response = await this.client.createUser(payload);
    const body = CreateUserResponseSchema.parse(await response.json());
    console.log(`[UserApiFlow] Flujo completado: usuario creado con id ${body.id}`);
    return { status: response.status(), body };
  }

  async updateUser(id: number, payload: UpdateUserRequest): Promise<{ status: number; body: UpdateUserResponse }> {
    console.log(`[UserApiFlow] Iniciando flujo: actualizar usuario id ${id}`);
    const response = await this.client.updateUser(id, payload);
    const body = UpdateUserResponseSchema.parse(await response.json());
    console.log(`[UserApiFlow] Flujo completado: usuario id ${id} actualizado`);
    return { status: response.status(), body };
  }

  async deleteUser(id: number): Promise<{ status: number }> {
    console.log(`[UserApiFlow] Iniciando flujo: eliminar usuario id ${id}`);
    const response = await this.client.deleteUser(id);
    console.log(`[UserApiFlow] Flujo completado: usuario id ${id} eliminado`);
    return { status: response.status() };
  }
}

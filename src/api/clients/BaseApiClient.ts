import { APIRequestContext, APIResponse, test } from '@playwright/test';

export class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async get(endpoint: string): Promise<APIResponse> {
    console.log(`[BaseApiClient] GET ${endpoint}`);
    const response = await this.request.get(endpoint);
    await this.logResponse(response, 'GET', endpoint);
    return response;
  }

  protected async post(endpoint: string, body: object): Promise<APIResponse> {
    console.log(`[BaseApiClient] POST ${endpoint}`);
    const response = await this.request.post(endpoint, { data: body });
    await this.logResponse(response, 'POST', endpoint);
    return response;
  }

  protected async put(endpoint: string, body: object): Promise<APIResponse> {
    console.log(`[BaseApiClient] PUT ${endpoint}`);
    const response = await this.request.put(endpoint, { data: body });
    await this.logResponse(response, 'PUT', endpoint);
    return response;
  }

  protected async delete(endpoint: string): Promise<APIResponse> {
    console.log(`[BaseApiClient] DELETE ${endpoint}`);
    const response = await this.request.delete(endpoint);
    await this.logResponse(response, 'DELETE', endpoint);
    return response;
  }

  private async logResponse(response: APIResponse, method: string, endpoint: string): Promise<void> {
    const status = response.status();
    console.log(`[BaseApiClient] ${method} ${endpoint} → ${status}`);

    if (status >= 500) {
      throw new Error(`[BaseApiClient] Error del servidor: ${method} ${endpoint} → ${status}`);
    }

    const body = await response.json().catch(() => ({}));
    await test.info().attach(`${method} ${endpoint} → ${status}`, {
      body: JSON.stringify(body, null, 2),
      contentType: 'application/json',
    });
  }
}

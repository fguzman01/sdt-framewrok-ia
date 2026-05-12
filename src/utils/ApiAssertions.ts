import { expect, test } from '@playwright/test';

export class ApiAssertions {

  static assertStatus(actual: number, expected: number): void {
    expect(actual, `status debe ser ${expected} y es ${actual}`).toBe(expected);
  }

  static assertBodyField(actual: unknown, expected: unknown, fieldName: string): void {
    expect(actual, `${fieldName} debe ser "${expected}" y es "${actual}"`).toBe(expected);
  }

  static assertBodyDefined(value: unknown, fieldName: string): void {
    expect(value, `${fieldName} debe estar definido y es "${value}"`).toBeDefined();
  }

  static assertBodyNull(value: unknown, fieldName: string): void {
    expect(value, `${fieldName} debe ser null y es "${value}"`).toBeNull();
  }

  static async attachBody(body: unknown): Promise<void> {
    await test.info().attach('response body', {
      body: JSON.stringify(body, null, 2),
      contentType: 'application/json',
    });
  }
}

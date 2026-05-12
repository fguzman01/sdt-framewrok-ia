import { test, expect } from '@playwright/test';
import { LoginFlow } from '../../src/flows/LoginFlow';
import { LoginDataProvider } from '../../src/data/providers/LoginDataProvider';
import { Messages } from '../../src/utils/Messages';

test.describe('Login - SauceDemo', () => {

  test('login exitoso redirige a inventario', async ({ page }) => {
    const data = LoginDataProvider.getById('login_success');
    const loginFlow = new LoginFlow(page);

    await test.step('Flujo: ejecutar login', async () => {
      await loginFlow.loginWith(data.username, data.password);
    });

    await expect(page).toHaveURL(new RegExp(data.expectedUrl!));
  });

  test('login con usuario vacío muestra error', async ({ page }) => {
    const data = LoginDataProvider.getById('login_empty_username');
    const loginFlow = new LoginFlow(page);

    await test.step('Flujo: ejecutar login', async () => {
      await loginFlow.loginWith(data.username, data.password);
    });

    await test.step('Validar: mensaje de error', async () => {
      expect(await loginFlow.getLoginError()).toBe(Messages.login.EMPTY_USERNAME);
    });
  });

  test('login con contraseña vacía muestra error', async ({ page }) => {
    const data = LoginDataProvider.getById('login_empty_password');
    const loginFlow = new LoginFlow(page);

    await test.step('Flujo: ejecutar login', async () => {
      await loginFlow.loginWith(data.username, data.password);
    });

    await test.step('Validar: mensaje de error', async () => {
      expect(await loginFlow.getLoginError()).toBe(Messages.login.EMPTY_PASSWORD);
    });
  });

  test('login con credenciales inválidas muestra error', async ({ page }) => {
    const data = LoginDataProvider.getById('login_invalid_credentials');
    const loginFlow = new LoginFlow(page);

    await test.step('Flujo: ejecutar login', async () => {
      await loginFlow.loginWith(data.username, data.password);
    });

    await test.step('Validar: mensaje de error', async () => {
      expect(await loginFlow.getLoginError()).toBe(Messages.login.INVALID_CREDENTIALS);
    });
  });

  test('login con usuario bloqueado muestra error', async ({ page }) => {
    const data = LoginDataProvider.getById('login_locked_user');
    const loginFlow = new LoginFlow(page);

    await test.step('Flujo: ejecutar login', async () => {
      await loginFlow.loginWith(data.username, data.password);
    });

    await test.step('Validar: mensaje de error', async () => {
      expect(await loginFlow.getLoginError()).toBe(Messages.login.LOCKED_USER);
    });
  });

});

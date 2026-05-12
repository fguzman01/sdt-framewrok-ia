import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    super(page);
  }

  async fillUsername(username: string): Promise<void> {
    console.log(`[LoginPage] Ingresando usuario: "${username}"`);
    await this.web.fill(this.usernameInput, username, 'Campo usuario');
  }

  async fillPassword(password: string): Promise<void> {
    console.log('[LoginPage] Ingresando contraseña');
    await this.web.fill(this.passwordInput, password, 'Campo contraseña');
  }

  async clickLogin(): Promise<void> {
    console.log('[LoginPage] Haciendo click en botón login');
    await this.web.click(this.loginButton, 'Botón login');
  }

  async getErrorMessage(): Promise<string> {
    console.log('[LoginPage] Obteniendo mensaje de error');
    return this.web.getText(this.errorMessage, 'Mensaje de error');
  }

  async isErrorVisible(): Promise<boolean> {
    console.log('[LoginPage] Verificando visibilidad del mensaje de error');
    return this.web.isVisible(this.errorMessage, 'Mensaje de error');
  }
}

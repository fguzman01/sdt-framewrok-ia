import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { WebUtils } from '../utils/WebUtils';

export class LoginFlow {
  private readonly loginPage: LoginPage;
  private readonly web: WebUtils;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.web = new WebUtils(page);
  }

  async loginWith(username: string, password: string): Promise<void> {
    console.log(`[LoginFlow] Iniciando flujo de login con usuario: "${username}"`);
    await this.loginPage.navigate('/');
    await this.loginPage.fillUsername(username);
    await this.loginPage.fillPassword(password);
    await this.loginPage.clickLogin();
    await this.web.takeScreenshot('resultado_login');
    console.log('[LoginFlow] Flujo de login completado');
  }

  async getLoginError(): Promise<string> {
    console.log('[LoginFlow] Obteniendo error de login');
    const message = await this.loginPage.getErrorMessage();
    await this.web.takeScreenshot('validacion_mensaje_error');
    return message;
  }

  async isLoginErrorVisible(): Promise<boolean> {
    console.log('[LoginFlow] Verificando si hay error de login visible');
    const visible = await this.loginPage.isErrorVisible();
    await this.web.takeScreenshot('validacion_error_visible');
    return visible;
  }
}

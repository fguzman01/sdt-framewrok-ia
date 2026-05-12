import { Page, test } from '@playwright/test';

export class WebUtils {
  constructor(private readonly page: Page) {}

  async click(selector: string, description: string): Promise<void> {
    console.log(`[ACTION] Click en: ${description} (${selector})`);
    await this.page.locator(selector).click();
  }

  async fill(selector: string, value: string, description: string): Promise<void> {
    console.log(`[ACTION] Fill en: ${description} → "${value}"`);
    await this.page.locator(selector).fill(value);
  }

  async getText(selector: string, description: string): Promise<string> {
    console.log(`[READ] Obteniendo texto de: ${description}`);
    return this.page.locator(selector).innerText();
  }

  async isVisible(selector: string, description: string): Promise<boolean> {
    const visible = await this.page.locator(selector).isVisible();
    console.log(`[CHECK] ${description} visible: ${visible}`);
    return visible;
  }

  async waitForSelector(selector: string, description: string): Promise<void> {
    console.log(`[WAIT] Esperando elemento: ${description}`);
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  async waitForNetworkIdle(): Promise<void> {
    console.log('[WAIT] Esperando que la red esté inactiva...');
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string): Promise<void> {
    console.log(`[SCREENSHOT] Capturando: ${name}`);
    const buffer = await this.page.screenshot({ fullPage: true });
    await test.info().attach(name, { body: buffer, contentType: 'image/png' });
  }
}

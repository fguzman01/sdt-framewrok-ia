import { Page } from '@playwright/test';
import { WebUtils } from '../utils/WebUtils';

export abstract class BasePage {
  protected readonly web: WebUtils;

  constructor(protected readonly page: Page) {
    this.web = new WebUtils(page);
  }

  async navigate(path: string = ''): Promise<void> {
    console.log(`[NAV] Navegando a: ${path || '/'}`);
    await this.page.goto(path);
  }

  async getTitle(): Promise<string> {
    const title = await this.page.title();
    console.log(`[READ] Título de página: "${title}"`);
    return title;
  }

  async waitForUrl(urlPattern: string | RegExp): Promise<void> {
    console.log(`[WAIT] Esperando URL: ${urlPattern}`);
    await this.page.waitForURL(urlPattern);
  }
}

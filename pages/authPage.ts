import { expect, Page } from '@playwright/test';
import { BasePage } from './base';
import { Urls, Users } from '../utils/testData';

export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async userLogin(email: string, password: string) {
    const adminEmail = email; // User email
    const adminPassword = password; // User password

    // Visit login page
    await this.page.goto(Urls.baseUrl + '/login', { waitUntil: 'networkidle' });

    // Enter login credentials and submit
    await this.validateAndFillStrings('//input[@type="email"]', adminEmail);
    await this.validateAndFillStrings('//input[@type="password"]', adminPassword);

    // Click the login button
    await this.waitforLocatorAndClick('//button[text()="Log in"]');
    await this.assertionValidate('//h2[normalize-space(text())="Servers"]');
    // Store Cookie State
    await this.page.context().storageState({ path: 'state.json' });

  };


}
import { expect, Page } from '@playwright/test';
import { BasePage } from './base';
import { Urls } from '../utils/testData';


export class ServersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async deleteServerAllSites(serverName: string) {
    try {
      // Ensure you're on the correct page
      await this.page.goto(Urls.baseUrl + '/servers', { waitUntil: 'networkidle' });

      // Select server
      await this.page.click(`//a[contains(text(), "${serverName}")]`);

      // Get sites
      const response = await this.page.waitForResponse((response) =>
        response.url().includes('/servers') && response.status() === 200,
        { timeout: 5000 }
      );

      const responseData = await response.json();
      const siteIds = responseData.props.sites?.map((site: { id: any }) => site.id) || [];

      console.log('Site IDs:', siteIds);

      // Delete each site
      for (let siteId of siteIds) {
        await this.deleteSite(siteId);
      }

    } catch (error) {
      console.error('Delete server sites failed:', error);
      throw error;
    }
  }

  async deleteSite(siteId: number) {
    try {
      // Navigate to site settings
      const siteUrl = `${Urls.baseUrl}/site/${siteId}/settings`;
      await this.page.goto(siteUrl, { waitUntil: 'networkidle' });

      // Click delete site button
      await this.validateAndClick('//button[contains(text(),"Delete Site")]');
      // Store site name
      const storeSiteName = await this.page.inputValue('//input[@placeholder="domain.com"]');
      console.log('Site Name:', storeSiteName);

      // Confirm deletion
      await this.validateAndFillStrings(`//input[@placeholder="${storeSiteName}"]`, storeSiteName);

      // Click final delete confirmation
      await this.validateAndClick('//button[contains(text(),"Cancel")]/preceding-sibling::button[contains(text(),"Delete Site")]');

    } catch (error) {
      console.error(`Delete site ${siteId} failed:`, error);
      throw error;
    }
  }
}
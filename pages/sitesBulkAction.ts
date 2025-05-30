import { expect, Page } from '@playwright/test';
import { BasePage } from './base';
import { Urls } from '../utils/testData';
import { faker } from '@faker-js/faker';


export class SitesBulkAction extends BasePage {
  constructor(page: Page) {
    super(page);
  }


/** ----------------Creation---------------- */
  /**
   * 
   * 
   * @event: createBulkSitesNginx
   * 
   * 
   * 
   */
  async createBulkSitesNginx(serverName: string, sitesCount: number) {
    await this.page.goto(Urls.baseUrl + '/servers', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');


    // Go to created server
    await this.validateAndClickByText(serverName);

    let serverId = await this.extractServerIdFromRedirect();


    for (let i = 0; i < sitesCount; i++) {
      await this.page.goto(Urls.baseUrl + `/servers/${serverId}/sites`, { waitUntil: 'domcontentloaded' });
      await this.page.waitForLoadState('domcontentloaded');

      console.log(`Starting creation for site ${i + 1} of ${sitesCount}`);

      // Create new site
      await this.validateAndClick('//button[normalize-space(text())="Create New Site"]');
      await this.assertionValidate('//h1[normalize-space(text())="Create Site"]');

      // Create instant site
      await this.validateAndClick('//h3[normalize-space(text())="Instant Site"]');
      // Validate using Test Domains
      const validateTestDomain = await this.page.locator('//h3[normalize-space(text())="About Test Domains"]').isVisible();
      // Click Next
      await this.validateAndClick("//button[normalize-space(text())='Next']");
      // Setting up the site
      await this.validateAndClickByText("Nginx");
      // Click Next
      await this.validateAndClick("//button[normalize-space(text())='Next']");

      // Setting up the site name
      const siteName = faker.lorem.words(1);
      await this.validateAndFillStrings("//input[@placeholder='My Awesome Site']", siteName);
      // Setting up the site admin email
      const siteEmail = faker.internet.email();
      await this.validateAndFillStrings("//input[@placeholder='you@example.com']", siteEmail);
      // Setting up the site admin username
      const siteUsername = faker.internet.username();
      await this.validateAndFillStrings("//input[@placeholder='username']", siteUsername);
      // Setting up the site admin password
      const sitePassword = faker.internet.password();
      await this.validateAndFillStrings("//input[@placeholder='password']", sitePassword);

      // Turning on purge cache
      await this.validateAndClick("(//button[@role='switch'])[2]");
      await this.validateAndClick("//button[normalize-space(text())='Next']");

      // Click Create Site
      await this.validateAndClick("//button[normalize-space(text())='Create Site']");

      // Validate creating started
      await this.assertionValidate("//h3[normalize-space(text())='Creating Site...']");
      console.log("Site Creation Started");
    }

  };



/** ----------------Deletion---------------- */
  /**
    * 
    * 
    * @event: deleteServerAllSites
    * 
    * 
    * 
    */
  async deleteServerAllSites(serverName: string) {
    try {
      // Ensure you're on the correct page
      await this.page.goto(Urls.baseUrl + '/servers', { waitUntil: 'domcontentloaded' });
      await this.page.waitForLoadState('domcontentloaded');
      // Select server
      const serverNameLocator = `//a[contains(text(), "${serverName}")]`
      await this.validateAndClick(serverNameLocator);

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
  };

  async deleteSite(siteId: number) {
    try {
      // Navigate to site settings
      const siteUrl = `${Urls.baseUrl}/site/${siteId}/settings`;
      await this.page.goto(siteUrl, { waitUntil: 'domcontentloaded' });

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
};
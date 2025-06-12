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
   * Create multiple Nginx sites on a given server.
   *
   * @param serverName - The name of the server to create sites on.
   * @param sitesCount - The number of sites to create.
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
   * Get all servers (id and name) from the servers page response using a base helper.
   * @returns Promise<{id: number, name: string}[]>
   */
  async getAllServers(): Promise<{ id: number, name: string }[]> {
    await this.page.goto(Urls.baseUrl + '/servers', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
    await this.validateAndClickAny('//a[contains(text(),"Servers")]');
    // Wait for the response that contains the servers data
    const response = await this.page.waitForResponse(
      resp => resp.url().endsWith('/servers') && resp.status() === 200
    );
    const responseData = await response.json();
    const servers = this.extractServerListFromResponse(responseData);
    if (!servers.length) {
      console.warn('No servers found in response!');
      return [];
    } else {
      console.log('Extracted servers:', servers.map(s => `ID: ${s.id}, Name: ${s.name}`));
      return servers;
    }
  }

  /**
   * Extract server list from response data (helper, can be moved to BasePage if not present)
   */
  extractServerListFromResponse(responseData: any): { id: number, name: string }[] {
    const servers = responseData.props?.servers || [];
    return servers.map((srv: any) => ({ id: srv.id, name: srv.name }));
  }

  /**
   * Delete all servers and their sites until none are left, validating after each step.
   */
  async deleteAllServersAndSites() {
    while (true) {
      await this.page.goto(Urls.baseUrl + '/servers', { waitUntil: 'domcontentloaded' });
      await this.page.waitForLoadState('domcontentloaded');
      // Check if the empty state is present
      const emptyState = await this.page.locator("//h3[contains(text(),'Create your first server')]").isVisible();
      if (emptyState) {
        console.log('No servers left.');
        break;
      }
      // Get all servers (id and name)
      const servers = await this.getAllServers();
      if (servers.length === 0) {
        console.log('No servers found.');
        break;
      }
      // Delete all sites and then the server for each server
      for (const { id, name } of servers) {
        console.log(`Deleting all sites for server: ${name} (ID: ${id})`);
        await this.deleteServerAllSites(id, name);
        // Validate no sites left
        await this.page.goto(`${Urls.baseUrl}/servers/${id}/sites`, { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('domcontentloaded');
        await this.assertionValidate('//p[contains(text(),"No sites found. Start by creating one.")]');
        console.log(`All sites deleted for server: ${name} (ID: ${id})`);
        // Now delete the server
        await this.deleteServers(name);
      }
    }
    // Final validation for no servers
    await this.page.goto(Urls.baseUrl + '/servers', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
    await this.assertionValidate("//h3[contains(text(),'Create your first server')]");
    console.log('All servers and sites deleted. Test complete.');
  }

  /**
   * Delete all sites for a given server.
   *
   * @param serverId - The ID of the server whose sites should be deleted.
   * @param serverName - The name of the server whose sites should be deleted.
   */
  async deleteServerAllSites(serverId: number, serverName?: string) {
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
  }

  /**
   * Delete a single site by its site ID.
   *
   * @param siteId - The ID of the site to delete.
   */
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

  /**
   * Delete a single server by its name.
   *
   * @param serverName - The name of the server to delete.
   * @returns Promise<boolean> - True if deleted successfully, false otherwise.
   */
  async deleteServers(serverName: string) {

    await this.page.goto(Urls.baseUrl + '/servers', { waitUntil: 'networkidle' });

    await this.validateAndClick(`//a[text()="${serverName}"]`);
    await this.assertionValidate(`//a[text()="${serverName}"]`);
    await this.validateAndClick(`//nav[@aria-label="Sidebar"]//span[normalize-space(text())="Settings"]`);
    await this.assertionValidate(`//input[@value="${serverName}"]`);
    await this.validateAndClick('//button[contains(text(),"Delete Server")]');
    await this.validateAndFillStrings(`//input[@placeholder="${serverName}"]`, serverName);
    await this.validateAndClick('//button[contains(text(),"Cancel")]/preceding-sibling::button[contains(text(),"Delete Server")]');

    try {
      await this.page.waitForLoadState('domcontentloaded');
      await this.waitforLocator('//h3[contains(text(),"Server deleted successfully.")]', { timeout: 30 * 1000 }); //Wait for 30 sec
      const validateDeletedMessage = await this.page.innerText('//h3[contains(text(),"Server deleted successfully.")]');
      console.log('Deleted-Message: ' + validateDeletedMessage);
      expect(validateDeletedMessage).toContain('Server deleted successfully.');
      return true;
    } catch (error) {
      console.log("Server not deleted. Error: ", error);
      return false;
    };
  };

};


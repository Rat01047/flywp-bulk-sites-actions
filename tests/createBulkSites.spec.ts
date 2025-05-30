import { test, expect } from '@playwright/test';
import { AuthPage } from "../pages/authPage";
import { SitesBulkAction } from "../pages/sitesBulkAction";
import { Users, Servers, Sites } from "../utils/testData";
import * as fs from "fs";

// Clear existing state file before login
fs.writeFileSync('state.json', JSON.stringify({cookies:[], origins: []}));

test('Login and Store State', async ({ browser, page }) => {
  // Validate credentials
  expect(Users.userEmail, 'User email must be provided').toBeTruthy();
  expect(Users.userPassword, 'User password must be provided').toBeTruthy();

  console.log('Attempting login with:');
  console.log('User Email:', Users.userEmail);
  console.log('User Password:', Users.userPassword.replace(/./g, '*')); // Mask password

  try {
    // Login
    const authPage = new AuthPage(page);
    await authPage.userLogin(Users.userEmail, Users.userPassword);

    // Store the state
    await page.context().storageState({ path: 'state.json' }); 
    console.log('Login successful. State stored in state.json');
    
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
});

test('Create bulk sites with Nginx', async ({ page }) => {
    // Create Bulk sites
    const sitesBulkAction = new SitesBulkAction(page);
    await sitesBulkAction.createBulkSitesNginx(Servers.serverName, Sites.sitesCount);

});
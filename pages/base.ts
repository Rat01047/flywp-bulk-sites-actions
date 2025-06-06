import { expect, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Just Validate
    async assertionValidate(locator: string) {
        await this.page.locator(locator).waitFor();
        return expect(this.page.locator(locator).isVisible).toBeTruthy();
    };

    // Validate and Click
    async validateAndClick(locator: string) {
        await this.page.locator(locator).waitFor();
        expect(this.page.locator(locator).isVisible).toBeTruthy();
        await this.page.locator(locator).click();
    };

    // Validate and Click by text
    async validateAndClickByText(locator: string) {
        await this.page.getByText(locator).waitFor();
        expect(this.page.getByText(locator).isVisible).toBeTruthy();
        await this.page.getByText(locator).click();
    };

    // Validate and Get text
    async validateAndGetText(locator: string) {
        await this.page.locator(locator).waitFor();
        expect(this.page.locator(locator).isVisible).toBeTruthy();
        return await this.page.locator(locator).textContent();
    };

    // Validate and Click
    async validateAndClickAny(locator: string) {
        const elements = this.page.locator(locator);
        const count = await elements.count();

        for (let i = 0; i < count; i++) {
            const element = elements.nth(i);
            if (await element.isVisible()) {
                await element.click();
                return; // Exit the function once a visible element is clicked
            }
        }

        throw new Error(`No visible elements found for locator: ${locator}`);
    }

    // Validate and Fill Strings
    async validateAndFillStrings(locator: string, value: string) {
        expect(this.page.locator(locator).isVisible).toBeTruthy();
        await this.page.locator(locator).fill(value);
    };

    // Validate and Fill Numbers
    async validateAndFillNumbers(locator: string, value: number) {
        await this.page.locator(locator).waitFor();
        expect(this.page.locator(locator).isVisible).toBeTruthy();
        await this.page.fill(locator, value.toString());
    };

    // Validate and CheckBox
    async validateAndCheckBox(locator: string) {
        await this.page.locator(locator).waitFor();
        expect(this.page.locator(locator).isVisible).toBeTruthy();
        await this.page.locator(locator).check();
    };

    // Wait for a Locator
    async waitforLocator(locator: string, options: { timeout: number }) {
        await this.page.waitForLoadState('domcontentloaded');
        return await this.page.waitForSelector(locator, options);
    };

    // Wait for a Locator and then Click
    async waitforLocatorAndClick(locator: string) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.locator(locator).waitFor();
        return await this.page.locator(locator).click();
    };

    // Match Toast Notification message(s)
    async matchToastNotifications(extractedToast: string, matchWithToast: string) {
        expect(matchWithToast).toContain(extractedToast);
    };


    // Helper function to extract server ID from the redirect URL
    async extractServerIdFromRedirect() {
        // Wait for a network response that contains '/servers/' in the URL and has a 200 OK status.
        // This response should be the one after the server is created, leading to the redirect.
        const [response] = await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/servers/') && response.status() === 200
            ),
        ]);

        // Extract the URL from the response object.
        const url = response.url();
        // Use a regular expression to find the server ID within the URL.
        // The pattern looks for '/servers/' followed by one or more digits, and captures those digits.
        const serverIdMatch = url.match(/\/servers\/(\d+)\//);
        // Log the matched server ID (or null if not found) for debugging purposes.
        console.log(`[1] This is the: ${serverIdMatch}`);
        // If a server ID is found (i.e., the regular expression match is successful),
        // convert it to an integer and return it. Otherwise, return undefined.
        return serverIdMatch ? parseInt(serverIdMatch[1], 10) : undefined;
    };

    // Helper function to extract server ID from the redirect URL
    async extractSiteIdFromRedirect() {
        // Wait for a network response that contains '/site/' in the URL and has a 200 OK status.
        // This response should be the one after the site is created, leading to the redirect.
        const [response] = await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/site/') && response.status() === 200
            ),
        ]);

        // Extract the URL from the response object.
        const url = response.url();
        // Use a regular expression to find the server ID within the URL.
        // The pattern looks for '/servers/' followed by one or more digits, and captures those digits.
        const siteIdMatch = url.match(/\/site\/(\d+)$/);
        // Log the matched server ID (or null if not found) for debugging purposes.
        console.log(`[1] This is the: ${siteIdMatch}`);
        // If a server ID is found (i.e., the regular expression match is successful),
        // convert it to an integer and return it. Otherwise, return undefined.
        return siteIdMatch ? parseInt(siteIdMatch[1], 10) : 0;
    };

    


}
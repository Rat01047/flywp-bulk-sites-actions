import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig(); // Load environment variables from .env file


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

const config: PlaywrightTestConfig = {
    testDir: "./tests",
    /* Maximum time one test can run for. */
    timeout: 300 * 1000, // 5 minute
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 30 * 1000, // 30 seconds
    },
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 0 : 0,
    /* Opt out of parallel tests */
    workers: process.env.CI ? 1 : 1, // Use 1 workers in CI, 2 locally
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: process.env.CI
        ? [
            ["list", { printSteps: true }], 
            ["html", { outputFolder: "playwright-report", open: "never" }],
            ["junit", { outputFile: "playwright-report/results.xml" }],     
            ["json", { outputFile: "playwright-report/results.json" }],
        ]
        : [
            ["list", { printSteps: true }],
            ["html", { open: "never" }],
            ["json", { outputFile: "test-results/results.json" }],          
        ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        actionTimeout: 0,
        trace: process.env.CI ? "retain-on-failure" : "on",
        headless: true,
        viewport: { width: 1280, height: 720 },
        screenshot: "only-on-failure",
        video: "on",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "Google Chrome",
            use: {
                ...devices["Desktop Chrome"],
                channel: "chrome",
                storageState: "state.json",
            },
        },
    ],

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',
};

export default config;
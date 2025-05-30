# FlyWP Bulk Sites Actions

Easily create and delete multiple sites on a FlyWP server using Playwright automation.

---

# 🚀 **Setup Instructions**

## Step 1: Clone the Repository

> Clone this repository to your local machine:

```
git clone https://github.com/Rat01047/flywp-bulk-sites-actions.git
```

## Step 2: Open the Project

> Open the cloned folder using your preferred code editor (e.g., VS Code).

## Step 3: Navigate to the Project Directory

> Ensure you are in the correct directory in your terminal:

```
cd flywp-bulk-sites-actions/flywp-bulk-actions/e2e
```

## Step 4: Install Dependencies

> Install the necessary dependencies:

```
npm install
```

> **Note:**
>
> - This suite uses your system-installed Google Chrome. Make sure Google Chrome is installed on your computer.
> - You do **NOT** need to run `npx playwright install chrome` or install any Playwright browsers. The suite will use your desktop's Chrome browser directly.

## Step 5: Configure Environment Variables

1. Open the file named `.env-example` in the `flywp-bulk-actions/e2e` directory.

2. Add your FlyWP credentials and server information:
   - `SITE_URL=____` (Your FlyWP site URL)
   - `ADMIN_EMAIL=____` (Your admin email address)
   - `ADMIN_PASSWORD=____` (Your admin password)
   - `SITES_COUNT=____` (The count of sites you want to create)
   - `SERVER_NAME=____` (The name of the server where sites need to be created or deleted. Create this server manually in FlyWP.)

3. Rename `.env-example` to `.env`:

```
mv .env-example .env
```

## Step 6: Run the Tests

> Only the Google Chrome project is configured. Run tests with:

```
npx playwright test --project="Google Chrome"
```

> For headed (UI) mode:

```
npx playwright test --project="Google Chrome" --headed
```

---

## 🎯 Features

• Automated Site Creation: Creates multiple sites on a specified server, using randomly generated site names, emails, and usernames.
• Automated Site Deletion: Deletes all sites associated with a specified server.
• Customizable Configurations: Set your FlyWP credentials and server details in the .env file.
• Efficient Browser Automation: Uses Playwright for fast and reliable automation of the processes.
• Supports Google Chrome only by default for simplicity and speed.
• All Playwright state is stored in `e2e/state.json` (no state files are created outside this directory).

## 📝 Important Notes

• Backup Data: Always back up your data before running the script to prevent accidental data loss.
• Browser Compatibility: This script is configured for Google Chrome only. You can add other browsers in the Playwright config if needed.
• Security: Keep your .env file private and secure to avoid unauthorized access. Ensure sensitive information such as your admin credentials is protected.

---

## 🤝 Contributing

You are welcome contributions to improve this project! Fork the repository and submit a pull request with your enhancements.

## 📧 Support

For questions or support, contact: ratul01047@gmail.com.

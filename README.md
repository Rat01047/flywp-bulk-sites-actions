# FlyWP Bulk Sites Actions

Easily Create and delete multiple sites on a FlyWP server using Playwright automation.

---

# 🚀 **Setup Instructions**

## <u> Step 1: Clone the Repository
>Clone this repository to your local machine:

```
git clone https://github.com/Rat01047/flywp-bulk-sites-actions.git
```

## <u> Step 2: Open the Project

> Open the cloned folder using your preferred code editor (e.g., VS Code).


## <u> Step 3: Navigate to the Project Directory

> Ensure you are in the correct directory in your terminal:

`cd flywp-bulk-sites-actions/e2e/`


## <u> Step 4: Install Dependencies

> Install the necessary dependencies, including Playwright:

`npm install @playwright/test`

## <u> Step 5: Configure Environment Variables

1. Open the file named .env-example in the project directory.

2. Add your FlyWP credentials and server information:
 	• SITE_URL=____ (Your FlyWP site URL)
	• ADMIN_EMAIL=____ (Your admin email address)
	• ADMIN_PASSWORD=____ (Your admin password)
 	• SITES_COUNT=____ (The count of sites you want to create) 
	• SERVER_NAME=____ (The name of the server where sites need to be created or deleted. Create this server manually in FlyWP.)

3. Rename .env-example to .env: `mv .env-example .env`


## <u> Step 6: Run the Script

> Execute the bulk deletion script in Chromium:

`npx playwright test --browser=chromium`

---

## <u> 	🎯 Features

• Automated Site Deletion: Deletes all sites associated with a specified server.
• Automated Site Creation: Creates multiple sites on a specified server, using randomly generated site names, emails, and usernames.
• Customizable Configurations: Set your FlyWP credentials and server details in the .env file.
• Efficient Browser Automation: Uses Playwright for fast and reliable automation of the processes.
• Supports Multiple Browsers: The script is configured to run with Chromium, but you can modify the script to use Firefox or Webkit if desired.

##	📝 Important Notes

• Backup Data: Always back up your data before running the script to prevent accidental data loss.
• Browser Compatibility: This script is configured for Chromium. You can switch to other browsers like Firefox or Webkit by modifying the browser argument (--browser=chromium).
• Security: Keep your .env file private and secure to avoid unauthorized access. Ensure sensitive information such as your admin credentials is protected.

---

##	🤝 Contributing

We welcome contributions to improve this project! Fork the repository and submit a pull request with your enhancements.

## 📧 Support

For questions or support, contact us at ratul01047@gmail.com.

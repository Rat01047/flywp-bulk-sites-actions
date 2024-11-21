# FlyWP Bulk Sites Delete

Easily delete multiple sites on a FlyWP server using Playwright automation.

---

## 🚀 **Setup Instructions**

### Step 1: Clone the Repository
Clone this repository to your local machine:
```bash
git clone https://github.com/Rat01047/flywp-bulk-sites-delete.git
```

### Step 2: Open the Project

Open the cloned folder using your preferred code editor (e.g., VS Code).


### Step 3: Navigate to the Project Directory

Ensure you are in the correct directory in your terminal:

`cd flywp-bulk-sites-delete`


### Step 4: Install Dependencies

Install the necessary dependencies, including Playwright:

`npm install @playwright/test`

### Step 5: Configure Environment Variables

1.	Open the file named .env-example in the project directory.

2.	Add your FlyWP credentials and server information:
	•	SITE_URL=____ (Your FlyWP site URL)
	•	ADMIN_EMAIL=____ (Your admin email address)
	•	ADMIN_PASSWORD=____ (Your admin password)
	•	SERVER_NAME=____ (The name of the server where sites need to be deleted)

3.	Rename .env-example to .env: `mv .env-example .env`


### Step 6: Run the Script

Execute the bulk deletion script in Chromium:

`npx playwright test --browser=chromium`

---

### 🎯 Features

	•	Automated Site Deletion: Deletes all sites associated with a specified server.
	•	Customizable Configurations: Set your FlyWP credentials and server details in the .env file.
	•	Lightweight and Fast: Uses Playwright for efficient browser automation.

### 📝 Important Notes

	•	Backup Data: Always back up your data before running the script to prevent accidental data loss.
	•	Browser Compatibility: This script is configured for Chromium. Modify the command to use other browsers if needed.
	•	Security: Keep your .env file private and secure to avoid unauthorized access.

---

### 🤝 Contributing

We welcome contributions to improve this project! Fork the repository and submit a pull request with your enhancements.

### 📧 Support

For questions or support, contact us at ratul01047@gmail.com.

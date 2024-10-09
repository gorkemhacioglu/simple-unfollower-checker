# Instagram Unfollowers Checker

A simple JavaScript script to identify Instagram accounts you follow but who do not follow you back. This script is 100% open-source and safe to use. It runs entirely on your machine and does not collect or transmit any data.

## Features
- Open-source and Safe: Review the code yourself before running it.
- Privacy First: Runs locally in your browser without collecting any data.
- Easy to Use: No installations or extensions required.
- Automated Process: Automatically scrolls through your followers and following lists.

## How It Works
The script performs the following steps:

1. **Collects the List of Accounts You Follow:** It opens your "Following" list and scrolls through it to collect all usernames.
2. **Collects the List of Your Followers:** It then opens your "Followers" list and scrolls through it to collect all usernames.
3. **Compares the Two Lists:** It identifies users you follow who do not follow you back.
4. **Displays the Results:** Outputs the list of usernames not following you back in the console.

## Usage Instructions
**Step 1: Log into Instagram**
* Open your web browser (Google Chrome is recommended).
* Go to instagram.com and log into your account.

**Step 2: Navigate to Your Profile**
* Click on your profile picture in the top-right corner.
* Select "Profile" from the dropdown menu.

**Step 3: Open the Browser Console**
* Right-click anywhere on your profile page.
* Select "Inspect" to open the developer tools.
* Click on the "Console" tab in the developer tools pane.

**Step 4: Copy the "instagram.js" in the repository.**

**Step 5: Paste and Run the Script**
* Paste the copied script into the console.
* Press Enter to execute the script.

**Step 6: Wait for Completion**
* The script will automatically scroll through your **"Following"** and **"Followers"** lists.
* Progress updates will be logged in the console.
* Once completed, it will display the list of usernames not following you back.

**Step 7: Review the Results**
* Look for the output in the console:

```javascript
Usernames not following back: ['username1', 'username2', 'username3', ...]
```
This is the list of users who are not following you back.

## Troubleshooting
1. Script Not Running: Ensure you're on your profile page and have opened the console.
2. Selectors Not Found: Instagram may have updated their website. You may need to inspect the page and update the selectors in the script.
3. Long Execution Time: If you have many followers, the script may take several minutes to complete. Be patient.

## Safety and Privacy
* **100% Open-source:** You can inspect the code yourself.
* **Runs Locally:** The script runs in your browser without external dependencies.
* **No Data Collection:** No data is collected or sent anywhere.


## Disclaimer
**No Warranty:** The script is provided "as is" without any warranty.
**Updates:** The script may need updates if Instagram changes its website structure.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## Contact
For any questions or suggestions, please open an issue on this repository.

(async function() {
    // Helper function to pause execution for a given time
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to get the list of accounts you are following
    async function getFollowingUsernames() {
        let followingUsernames = new Set();

        // Update the selector for the modal containing the "Following" list
        let modal = document.querySelector('div.xyi19xy.x1ccrb07.xtf3nb5.x1pc53ja.x1lliihq.x1iyjqo2.xs83m0k.xz65tgg.x1rife3k.x1n2onr6');
        if (!modal) {
            console.error("Unable to find the following list modal.");
            return [];
        }

        let scrollBox = modal;
        let previousHeight = 0;
        let sameHeightCount = 0;

        while (true) {
            // Scroll to the bottom
            scrollBox.scrollTop = scrollBox.scrollHeight;
            await sleep(1000);
            console.log(followingUsernames.size + ' followed users found..')

            // Collect usernames using a flexible class selector for the usernames
            let userElements = modal.querySelectorAll('span._ap3a._aaco._aacw._aacx._aad7._aade');
            userElements.forEach(user => {
                let username = user.textContent;
                if (username) {
                    followingUsernames.add(username);
                    //console.log(username); // Logs each username found
                }
            });

            // Check if we've reached the bottom
            let currentHeight = scrollBox.scrollHeight;
            if (currentHeight === previousHeight) {
                sameHeightCount++;
                if (sameHeightCount > 10) {
                    break;
                }
            } else {
                sameHeightCount = 0;
            }
            previousHeight = currentHeight;
        }

        // Close the modal after collecting usernames
        let closeButton = document.querySelector('button._abl-');
        if (!closeButton) {
            console.error("Unable to find the closeButton.");
            return [];
        }
        closeButton.click();
        await sleep(1000);

        return Array.from(followingUsernames);
    }

    // Function to search each user in the already opened 'Followers' modal
    async function getFollowerUsernames() {
        let followerUsernames = new Set();

        // Update the selector for the modal containing the "Following" list
        let modal = document.querySelector('div.xyi19xy.x1ccrb07.xtf3nb5.x1pc53ja.x1lliihq.x1iyjqo2.xs83m0k.xz65tgg.x1rife3k.x1n2onr6');
        if (!modal) {
            console.error("Unable to find the follower list modal.");
            return [];
        }

        let scrollBox = modal;
        let previousHeight = 0;
        let sameHeightCount = 0;

        while (true) {
            // Scroll to the bottom
            scrollBox.scrollTop = scrollBox.scrollHeight;
            await sleep(1000);
            console.log(followerUsernames.size + ' followers found..')

            // Collect usernames using a flexible class selector for the usernames
            let userElements = modal.querySelectorAll('span._ap3a._aaco._aacw._aacx._aad7._aade');
            userElements.forEach(user => {
                let username = user.textContent;
                if (username) {
                    followerUsernames.add(username);
                    //console.log(username); // Logs each username found
                }
            });

            // Check if we've reached the bottom
            let currentHeight = scrollBox.scrollHeight;
            if (currentHeight === previousHeight) {
                sameHeightCount++;
                if (sameHeightCount > 10) {
                    break;
                }
            } else {
                sameHeightCount = 0;
            }
            previousHeight = currentHeight;
        }

        // Close the modal after collecting usernames
        let closeButton = document.querySelector('button._abl-');
        if (!closeButton) {
            console.error("Unable to find the closeButton.");
            return [];
        }
        closeButton.click();
        await sleep(1000);

        return Array.from(followerUsernames);
    }

    // Main function to run the process
    try {
        // Step 1: Click on 'Following' and collect usernames
        var linkClicked = await clickFollowingLink();
        if (linkClicked) {
            let followingUsernames = await getFollowingUsernames();
            console.log('Collected Following Usernames:', followingUsernames);

            linkClicked = await clickFollowersLink();
            if (linkClicked) {
                let followerUsernames = await getFollowerUsernames();
                console.log('Collected Follower Usernames:', followerUsernames);

                // Convert followerUsernames into a Set for efficient lookup
                let followerUsernamesSet = new Set(followerUsernames);

                // Find usernames in followingUsernames that are not in followerUsernames
                let notFollowingBack = followingUsernames.filter(username => !followerUsernamesSet.has(username));

                console.log('Usernames not following back:', notFollowingBack);
            }
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }

    // Function to click the 'Following' link and open the modal
    async function clickFollowingLink() {
        // Find and click the 'Following' link
        let followingLink = document.querySelector('a[href$="/following/"]');
        if (!followingLink) {
            console.error("Unable to find the 'Following' link.");
            return false;
        }
        followingLink.click();
        console.log("Clicked the 'Following' link. Waiting for the modal to load...");
        await sleep(3000); // Wait for the modal to load
        return true;
    }

    async function clickFollowersLink() {
        // Find and click the 'Followers' link
        let followersLink = document.querySelector('a[href$="/followers/"]');
        if (!followersLink) {
            console.error("Unable to find the 'Followers' link.");
            return false;
        }
        followersLink.click();
        console.log("Clicked the 'Followers' link. Waiting for the modal to load...");
        await sleep(3000); // Wait for the modal to load
        return true;
    }

})();
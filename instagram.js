(async function() {
    // Helper function to pause execution for a given time
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to get the list of accounts you are following
    async function getFollowingUsernames() {
        let followingUsernames = new Set();

        // Update the selector for the modal containing the "Following" list
        let modal = document.querySelector('body > div.x1n2onr6.xzkaem6 > div:nth-child(2) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.x15fl9t6.x1yw9sn2.x1evh3fb.x4giqqa.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div.x6nl9eh.x1a5l9x9.x7vuprf.x1mg3h75.x1lliihq.x1iyjqo2.xs83m0k.xz65tgg.x1rife3k.x1n2onr6');
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
        let modal = document.querySelector('body > div.x1n2onr6.xzkaem6 > div:nth-child(2) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.x15fl9t6.x1yw9sn2.x1evh3fb.x4giqqa.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe > div > div > div.x6nl9eh.x1a5l9x9.x7vuprf.x1mg3h75.x1lliihq.x1iyjqo2.xs83m0k.xz65tgg.x1rife3k.x1n2onr6');
        if (!modal) {
            throw new Error("Unable to retrieve your follower list. Instagram sometimes limits visibility to reduce workload. Please try again later.");
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
            //console.log('Collected Following Usernames:', followingUsernames);

            linkClicked = await clickFollowersLink();
            if (linkClicked) {
                let followerUsernames = await getFollowerUsernames();
                //console.log('Collected Follower Usernames:', followerUsernames);

                // Convert followerUsernames into a Set for efficient lookup
                let followerUsernamesSet = new Set(followerUsernames);

                // Find usernames in followingUsernames that are not in followerUsernames
                let notFollowingBack = followingUsernames.filter(username => !followerUsernamesSet.has(username));

                console.log('Usernames not following back:', notFollowingBack);
            }
        }

    } catch (error) {
        console.error("Oh no!:", error);
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


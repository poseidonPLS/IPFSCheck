browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateExtensionIcon(tab);
  }
});

async function updateExtensionIcon(tab) {
  let isGreenSite = false;

  try {
    const response = await fetch('http://23.94.94.110/site_info.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const siteData = await response.json();

    for (const [site, info] of Object.entries(siteData)) {
      const ipfsAddress = info.ipfs_address || 'Not found';
      const domain = `https://${site}`;

      if (tab.url.startsWith(domain) || tab.url.includes(ipfsAddress)) {
        isGreenSite = true;
        break; // Stop looping through sites if a match is found
      }
    }

    // Update extension icon based on IPFS hash match or specific sites
    if (isGreenSite) {
      browser.browserAction.setIcon({
        path: {
          "32": "images/icon_green32.png",
          "48": "images/icon_green48.png",
          "128": "images/icon_green128.png"
        },
        tabId: tab.id
      });
      // Perform other actions if necessary
    } else {
      // Switch icon for other specific sites like Piteas or B9
      if (tab.url.startsWith('https://app.piteas.io/') || tab.url.startsWith('https://piteas.io/')) {
        browser.browserAction.setIcon({
          path: {
            "32": "images/icon_pit32.png",
            "48": "images/icon_pit48.png",
            "128": "images/icon_pit128.png"
          },
          tabId: tab.id
        });
        // Perform other actions if necessary
      } else if (tab.url.startsWith('https://b9.xyz/')) {
        browser.browserAction.setIcon({
          path: {
            "32": "images/icon_b932.png",
            "48": "images/icon_b948.png",
            "128": "images/icon_b9128.png"
          },
          tabId: tab.id
        });
        // Perform other actions if necessary
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle errors if needed
  }
}

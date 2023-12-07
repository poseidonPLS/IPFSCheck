document.addEventListener('DOMContentLoaded', () => {
  fetchSiteInfo();
});

async function fetchSiteInfo() {
  try {
    const response = await fetch('http://23.94.94.110/site_info.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const siteData = await response.json();

    for (const [site, info] of Object.entries(siteData)) {
      const ipfsAddress = info.ipfs_address || 'Not found';
      const version = info.version || 'Not found';
      const domain = `https://${site}`;

      const siteAnchor = document.createElement('a');
      siteAnchor.textContent = `${site} - Version: ${version}`;
      siteAnchor.style.color = 'white';
      siteAnchor.style.fontSize = '13.5px';

      const ipfsElement = document.createElement('p');
      ipfsElement.textContent = `CID: ${ipfsAddress}`;
      ipfsElement.style.fontSize = '13.5px';

      const container = document.createElement('div');
      container.appendChild(siteAnchor);
      container.appendChild(ipfsElement);

      document.body.appendChild(container);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle errors if needed
  }
}

import browser from 'webextension-polyfill'

const blockedSites = ['facebook.com', 'twitter.com', 'instagram.com', 'youtube.com']

function blockSites() {
  const currentUrl = window.location.hostname
  if (blockedSites.some(site => currentUrl.includes(site))) {
    document.body.innerHTML = `
      <div style="text-align: center; padding: 50px;">
        <h1>Site Blocked</h1>
        <p>This site is blocked during focus mode.</p>
      </div>
    `
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'enableFocusMode') {
    blockSites()
  } else if (message.action === 'disableFocusMode') {
    window.location.reload()
  }
})

// Check focus mode status on page load
browser.storage.local.get('focusMode').then((result) => {
  if (result.focusMode) {
    blockSites()
  }
})
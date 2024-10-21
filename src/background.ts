import browser from 'webextension-polyfill'

browser.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleFocusMode') {
    if (message.value) {
      // Enable focus mode
      browser.tabs.query({}).then((tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            browser.tabs.sendMessage(tab.id, { action: 'enableFocusMode' })
          }
        })
      })
    } else {
      // Disable focus mode
      browser.tabs.query({}).then((tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            browser.tabs.sendMessage(tab.id, { action: 'disableFocusMode' })
          }
        })
      })
    }
  }
})
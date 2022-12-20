const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  responseTimeout: 30000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  numTestsKeptInMemory: 10,
  redirectionLimit: 100,
  video: false,
  scrollBehavior: 'center',
  chromeWebSecurity: false,
  watchForFileChanges: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  "reporter": "cypress-mochawesome-reporter",
    "reporterOptions": {
        "reportDir": "cypress/report",
        "reportFilename": "index",
        "reportPageTitle": "Sherpany - Report",
        "overwrite": false,
        "html": false,
        "json": true,
        "cdn": true,
        "video": false,
        "embeddedScreenshots": true,
        "inlineAssets": true
  },
  e2e: {
    "baseUrl": "https://app.sherpany.com/",
    "integrationFolder": "cypress/e2e",
    "supportFile": "cypress/support/e2e.js",
  },
})

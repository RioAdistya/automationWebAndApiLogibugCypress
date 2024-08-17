const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // baseUrl: 'https://logibug.fly.dev/api/v1',
    baseUrl: 'https://logibugv2.fly.dev/api/v1',
    specPattern: 'cypress/e2e',
    // supportFile: false,
    setupNodeEvents(on, config) {
    },
    env: {
      // hideCredentials: true,
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2ODYwNTk3OTB9.qOlAwJIdabLurPAGxLUDE6HJ_etKdYQAsFKkTQh4QiI',
      email: 'rioputra191101@gmail.com',
      password: '12345678',
    }
  },
});

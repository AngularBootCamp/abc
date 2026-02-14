// This file is part of the Cypress class
// it is used to demonstrate a "native script"
// based approach to test setup

const https = require('http');

const options = {
  hostname: 'localhost',
  port: 8085,
  path: '/soccer/reset',
  method: 'POST'
};

const req = https.request(options, res => {
  process.exit(0);
});

req.on('error', error => {
  process.exit(1);
});

req.end();

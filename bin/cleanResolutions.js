#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

// Path to package.json
const packageJsonPath = path.join(__dirname, '../package.json');

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Remove all resolutions that contain "portal:"
if (packageJson.resolutions) {
  Object.keys(packageJson.resolutions).forEach((key) => {
    if (packageJson.resolutions[key].includes('portal:')) {
      delete packageJson.resolutions[key];
    }
  });

  // Write the updated package.json back to the file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

console.log('Cleaned up resolutions containing "portal:".');

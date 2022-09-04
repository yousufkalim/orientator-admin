let baseUrl = 'http://localhost:5000/api/';
let url = 'http://localhost:5000/';

if (window.location.host === 'orientator-admin-dev.falconweb.app') {
  baseUrl = 'https://orientator-api-dev.falconweb.app/api/';
  url = 'https://orientator-api-dev.falconweb.app/';
} else if (window.location.host === 'orientator-admin-qa.falconweb.app') {
  baseUrl = 'https://orientator-qa.falconweb.app/api/';
  url = 'https://orientator-qa.falconweb.app/';
} else if (window.location.host === 'orientator-admin-staging.falconweb.app') {
  baseUrl = 'https://orientator-api-staging.falconweb.app/api/';
  url = 'https://orientator-api-staging.falconweb.app/';
} else if (window.location.host === 'admin.orientator.com') {
  baseUrl = 'https://api.orientator.com/api/';
  url = 'https://api.orientator.com/';
}

module.exports = { baseUrl, url };

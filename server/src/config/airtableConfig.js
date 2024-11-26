require('dotenv').config();
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'patZNj6KzpFhXOalp.6e80aacc6968eb1967b08c0b899592eb96aea519017ca81b021d1f5d1f1c1319';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appsnL3iOHu1j4xRG';

module.exports = {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID,
};

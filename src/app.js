const express = require('express');
const path = require('path');
require('dotenv').config();

const googleSheetsApi = require('./googleSheetsApi');

const app = express();
const PORT = process.env.PORT || 8080;

// Debug: Check if environment variables are loaded
console.log('API Key loaded:', process.env.Google_API_KEY ? 'YES' : 'NO');
console.log('Spreadsheet ID loaded:', process.env.Google_spreadsheetId ? 'YES' : 'NO');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve your main page at /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for Google Sheets
app.get('/api/sheet', googleSheetsApi.fetchSheetData);

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
});
const express = require('express');
const path = require('path');
require('dotenv').config();

const googleSheetsApi = require('./googleSheetsApi');

const app = express();
const PORT = process.env.PORT || 3000;

// // Debug: Check if environment variables are loaded
// console.log('API Key loaded:', process.env.Google_API_KEY ? 'YES' : 'NO');
// console.log('Spreadsheet ID loaded:', process.env.Google_spreadsheetId ? 'YES' : 'NO');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve your main page at /
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'listings.html'));

  console.log('spreadsheetId: ', process.env.XLSX_ID);
  const spreadsheetId = process.env.XLSX_ID;
  const API_KEY = process.env.Google_API_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/JobBoard!A1:D3?majorDimension=COLUMNS&key=${API_KEY}`;

  // try {
  //   res.sendFile(path.join(__dirname, 'public', 'listings.html'));

  //   const response = await axios.get(url);
  //   res.json(response.data);
  // } catch (error) {
  //   res.status(500).send('Error fetching Google API sheet.')
  // }
});

// API endpoint for Google Sheets
app.get('/api/sheet', googleSheetsApi.fetchSheetData);

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
});
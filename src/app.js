const express = require('express');
const axios = require('axios');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// Adding comment for test commit.

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up EJS layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api.html'));
  console.log('spreadsheetId:', process.env.XLSX_ID);
  console.log('API_KEY:', process.env.API_KEY);
  const spreadsheetId = process.env.XLSX_ID;
  const KEY = process.env.API_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/JobBoard!A1:D3?majorDimension=COLUMNS&key=${KEY}`;

  try {
    res.sendFile(path.join(__dirname, 'public', 'api.html'));
    const response = await axios.get(url);
    res.json(response.data);
    // console.log(response.data);
  } catch (error) {
    res.status(500).send('Error fetching Google Sheet');
  }
});

// Serve the API at /api/sheet
app.get('/api/sheet', async (req, res) => {
  const spreadsheetId = process.env.Google_spreadsheetId;
  const API_KEY = process.env.Google_API_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/JobBoard!A1:D3?majorDimension=COLUMNS&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Google Sheets API error:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching Google Sheet');
  }
});

// Serve your HTML at /
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'api.html'));
// });

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
});
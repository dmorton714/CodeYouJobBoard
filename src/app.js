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
  const spreadsheetId = '1OHIJj0D0Q-2lHgSL184vxBaxhIdSYqzso3UJvcRUflo';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;

  // Authorised redirect url"
  // http://localhost:3000/oauth2callback
  
  const accessToken = process.env.GOOGLE_SHEETS_TOKEN; // Store your OAuth token in .env

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.json(response.data); // Or render a view with the data
  } catch (error) {
    res.status(500).send('Error fetching Google Sheet');
  }
});

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
});
const axios = require('axios');

const fetchSheetData = async (req, res) => {
  const spreadsheetId = process.env.XLSX_ID;
  const API_KEY = process.env.Google_API_KEY;
  
  console.log('Using API Key:', API_KEY ? 'Found' : 'Missing');
  console.log('Using Spreadsheet ID:', spreadsheetId ? 'Found' : 'Missing');
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/JobBoard!A1:I10?majorDimension=COLUMNS&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Google Sheets API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching Google Sheet' });
  }
};

module.exports = {
  fetchSheetData
};
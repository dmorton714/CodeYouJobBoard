//function doGet(e) {

//    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("JobBoard");
//    const data = sheet.getDataRange().getValues();
//    const headers = data[0];
//    const jobs = [];

//    for (let i = 1; i < data.length; i++) {
//        //need to make a loop for the GET function to go through each row of data from Google Sheets, "JobBoard" sheet

//        const row = data[i];
//        for (let j = 0; j < headers.length; j++) {
//            const job = {};
//            job[headers[j]] = row[j];
//            jobs.push(job);
//        }

//        return ContentService.createTextOutput(JSON.stringify(jobs))
//            .setMimeType(ContentService.MimeType.JSON);


//    }

//}


const axios = require('axios');

const fetchSheetData = async (req, res) => {
    const spreadsheetId = process.env.Google_spreadsheetId;
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
function doGet(e) {

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("JobBoard");
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const jobs = [];

    for (let i = 1; i < data.length; i++) {
        //need to make a loop for the GET function to go through each row of data from Google Sheets, "JobBoard" sheet

        const row = data[i];
        for (let j = 0; j < headers.length; j++) {            
            const job = {};
            job[headers[j]] = row[j];
            jobs.push(job);
        }
        
        return ContentService.createTextOutput(JSON.stringify(jobs))
            .setMimeType(ContentService.MimeType.JSON);
            

    }

}

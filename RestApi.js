function doGet(e) {

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("JobBoard");
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const jobs = [];

    for (let i = 1; i < data.length; i++) {

    }

}

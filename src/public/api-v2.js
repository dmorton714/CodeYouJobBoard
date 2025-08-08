/**
 * Loads data from the specified URL and populates the table.
 * @param {string} url - The path to your JSON file or API endpoint.
 */
async function loadIntoTable(url, table) {
    //use async to pause the code while fetch gets the data

    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
}

loadIntoTable("./data.json", document.querySelector("table"));
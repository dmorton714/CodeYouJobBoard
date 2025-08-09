/**
 * Loads data from the specified URL and populates the table.
 * @param {string} url - The path to your JSON file or API endpoint.
 */
async function loadIntoTable(url, table) {
    //use async to pause the code while fetch gets the data
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const response = await fetch(url);
    const { headers, values } = await response.json();

    // Clear the table (for each function call)
    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    // Populate the headers!
    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    // Populate the rows ('values')
    for (const value of values) {
        const rowElement = document.createElement("tr");

        for (const cellText of value) {
            const cellElement = document.createElement("td");
            cellElement.textContent = cellText;
            rowElement.appendChild(cellElement);
        }

        // append the row to the table itself
        // tableBody = <tbody> in the html
        tableBody.appendChild(rowElement);
    }
}

/**
 * NOTE: Why do we set tableHead.innerHTML = "<tr></tr>", but only clear tableBody.innerHTML?
 *
 * In HTML tables, the <thead> section is meant to contain a single <tr> (table row) element,
 * which in turn contains all the <th> (table header) cells. When dynamically generating a table,
 * it's common to reset the <thead> to a single empty <tr> so we can append header cells to it.
 * 
 * Example:
 * <thead>
 *   <tr>
 *     <th>Header 1</th>
 *     <th>Header 2</th>
 *   </tr>
 * </thead>
 *
 * For <tbody>, we simply clear its contents with tableBody.innerHTML = "" because each data row
 * will be created as a new <tr> and appended directly to <tbody>. There is no need to pre-insert
 * a <tr> in <tbody>—the script will generate as many <tr> elements as needed for the data.
 *
 * In summary:
 * - <thead> needs a single <tr> to hold all header cells, so we reset it to "<tr></tr>".
 * - <tbody> is emptied and then filled with new <tr> rows for each data
 */

loadIntoTable("./data.json", document.querySelector("table"));
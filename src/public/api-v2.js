/**
 * Load JSON and populate an HTML <table>.
 * Modified to work with `majorDimension` === "ROWS" or "COLUMNS".
 * Also handles ragged rows safely, as is the data returned from our Google API.
 *
 * @param {string} url - Path to JSON file or API.
 * @param {HTMLTableElement} table - The table element to fill.
 */
async function loadIntoTable(url, table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");

  const response = await fetch(url);
  const data = await response.json();

  const headers = data.headers ?? [];
  const major = (data.majorDimension || "").toUpperCase();
  let values = Array.isArray(data.values) ? data.values : [];

  // Normalize data to ROWS no matter JSON-structure type is given....
  values = normalizeToRows(values, major, headers);

  // Clear current table, as we need to EACH function call
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  // Build header row
  const headRow = tableHead.querySelector("tr");
  for (const h of headers) {
    const th = document.createElement("th");
    th.textContent = h;
    headRow.appendChild(th);
  }

  // Build body rows
  const fragment = document.createDocumentFragment();
  for (const row of values) {
    const tr = document.createElement("tr");
    // Only render as many cells as there are headers (we'll ignore extra cells)
    for (let i = 0; i < headers.length; i++) {
      const td = document.createElement("td");
      td.textContent = row[i] ?? ""; // handle missing cells
      tr.appendChild(td);
    }
    fragment.appendChild(tr);
  }
  tableBody.appendChild(fragment);
}

/** Transpose all data to row-major form. */
function normalizeToRows(values, major, headers) {
  if (major === "ROWS") return values;
  if (major === "COLUMNS") return transpose(values);

  // If majorDimension is missing, try to infer:
  // - If values.length === headers.length, likely COLUMNS
  // - If values[0]?.length === headers.length, likely ROWS
  if (Array.isArray(values[0])) {
    if (values.length === headers.length) return transpose(values);
    if (values[0].length === headers.length) return values;
  }
  // Fallback: assume the data is likely in a row-major form (hopefully lol)
  return values;
}

/** Simple func to transpose a 2D array. */
function transpose(matrix) {
  if (!matrix.length) return [];
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

loadIntoTable('./data.json', document.querySelector("table"));
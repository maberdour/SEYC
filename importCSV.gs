function appendNewEventsByURL_NoHeaders_FromFolder() {
  const folderId = '1KQaUXfUNbIQSABXI-SdfNhrk6AmoP30_';
  const filename = 'event_data.csv';
  const urlColumnIndex = 1; // Column B = URL

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByName(filename);
  if (!files.hasNext()) {
    Logger.log("❌ File not found: " + filename);
    return;
  }

  const file = files.next();
  const csv = file.getBlob().getDataAsString();
  const csvData = Utilities.parseCsv(csv);
  if (csvData.length === 0) {
    Logger.log("❌ CSV is empty.");
    return;
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const sheetData = sheet.getDataRange().getValues();

  const existingUrls = new Set(
    sheetData.map(row => row[urlColumnIndex])
  );

  const newRows = [];
  const now = formatDateTime(new Date());

  csvData.forEach(row => {
    let url = row[urlColumnIndex];

    if (url && url.startsWith('/events')) {
      url = 'https://www.britishcycling.org.uk' + url;
    }

    if (existingUrls.has(url)) return;

    row[urlColumnIndex] = url;
    row.push(now);
    newRows.push(row);
  });

  if (newRows.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, newRows[0].length).setValues(newRows);
    Logger.log(`✅ Added ${newRows.length} new events.`);
  } else {
    Logger.log("ℹ️ No new rows to add.");
  }
}

function formatDateTime(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

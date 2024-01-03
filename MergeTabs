function myMerge() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetDelete = ss.getSheetByName('MasterMerge');
  Logger.log(sheetDelete);
  if (sheetDelete != null) {
    ss.deleteSheet(sheetDelete);
  }

  const sheets = ss.getSheets();
  var mergeData = [];

  sheets.slice(1).forEach((s, index) => {
    var firstRowModifier = 1;
    var lastRow = getLastNonEmptyRow(s, 'A', 1);
    var range = s.getRange(firstRowModifier + 1, 1, lastRow - firstRowModifier, 4);
    var rangeValues = range.getValues();
    var header = range.getSheet().getRange(1, 1, 1, 4).getValues()[0]; // Fetch header from the first row

    // Iterate through each row in the range
    rangeValues.forEach(row => {
      // Exclude rows where all values are empty
      if (row.some(cell => cell !== "")) {
        // Append data to the mergeData array
        mergeData.push([...row, s.getSheetName()]);
      }
    });
  });

  var newMasterSheet = ss.insertSheet('MasterMerge');
  newMasterSheet.getRange(1, 1, 1, 5).setValues([['Date', 'Event', 'Location', 'Link', 'SheetName']]); // Use your actual headers
  newMasterSheet.getRange(2, 1, mergeData.length, 5).setValues(mergeData);
}

function getLastNonEmptyRow(sheet, column, startRow) {
  var values = sheet.getRange(column + startRow + ':' + column + sheet.getMaxRows()).getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    if (values[i][0] !== "") {
      return i + startRow + 1;
    }
  }
  return startRow; // If all cells are empty
}

function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Merge Sheets')
    .addItem('MergeAllSheets', 'myMerge')
    .addToUi();
}

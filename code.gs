function getData(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();

  // Assuming the first row contains column headers
  var headers = data[0];
  var jsonData = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var entry = {};
    var currentDate = new Date();
    
    // Assuming the column containing the date is named 'Date'
    var dateColumnIndex = headers.indexOf('Date');
    var eventDate = new Date(row[dateColumnIndex]);

    // Check if the event date is in the future
    if (eventDate.getTime() >= currentDate.getTime()) {
      for (var j = 0; j < headers.length; j++) {
        if (headers[j] === 'Date') {
          // Format the date as "Day of Week, Day Month Year"
          entry[headers[j]] = Utilities.formatDate(eventDate, 'Europe/London', 'EEEE, dd MMMM yyyy');
        } else {
          entry[headers[j]] = row[j];
        }
      }
      jsonData.push(entry);
    }
  }

  return jsonData;
}

// Rest of the code remains unchanged


function serveJSON(sheetName) {
  var data = getData(sheetName);
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var path = e.parameter.path;

  if (path === 'road') {
    return serveJSON('Road');
  } else if (path === 'track') {
    return serveJSON('Track');
  } else if (path === 'cx') {
    return serveJSON('CX');
  } else if (path === 'mtb') {
    return serveJSON('MTB');
  } else if (path === 'bmx') {
    return serveJSON('BMX');
  } else if (path === 'speedway') {
    return serveJSON('Speedway');
  } else if (path === 'triathlon') {
    return serveJSON('Triathlon');
  } else if (path === 'hillclimb') {
    return serveJSON('Hillclimb');
  } else if (path === 'timetrial') {
    return serveJSON('TimeTrial');
  } else {
    return ContentService.createTextOutput('Invalid path');
  }
}

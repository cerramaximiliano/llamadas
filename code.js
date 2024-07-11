function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Lead Management')
    .addItem('Actualizar Estado', 'showUpdateForm')
    .addToUi();
}

function showUpdateForm() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('UpdateForm')
    .setWidth(300)
    .setHeight(200);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Actualizar Estado del Lead');
}

function updateLeadStatus(leadId, status) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads'); // Ajusta el nombre según tu hoja
  var range = sheet.getRange('J2:J'); // Suponiendo que los IDs de los leads están en la columna J
  var values = range.getValues();
  
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] == leadId) {
      sheet.getRange(i + 2, 9).setValue(status); // Ajusta el número de columna según tu hoja (Columna I es la 9ª)
      logChange(leadId, status);
      SpreadsheetApp.getUi().alert('Estado actualizado');
      return;
    }
  }
  SpreadsheetApp.getUi().alert('Lead ID no encontrado');
}

function logChange(leadId, status) {
  var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Logs'); // Ajusta el nombre según tu hoja
  if (!logSheet) {
    logSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Logs');
    logSheet.appendRow(['Timestamp', 'Lead ID', 'Status']);
  }
  logSheet.appendRow([new Date(), leadId, status]);
}

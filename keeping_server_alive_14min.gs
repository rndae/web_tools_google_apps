var url = "https://test-drive-live-api-server.onrender.com/api/home";

function pingServer() {
  var response = UrlFetchApp.fetch(url);
  Logger.log("Pinged " + url + " with status " + response.getResponseCode() + " and content " + response.getContentText());
}

function createTimeDrivenTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var existingTrigger = null;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "pingServer") {
      existingTrigger = triggers[i];
      break;
    }
  }
  if (!existingTrigger) {
    ScriptApp.newTrigger("pingServer")
      .timeBased()
      .everyMinutes(14)
      .create();
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput("<p>This is a Google Apps Script web app that pings our render server every 14 minutes.</p>");
}

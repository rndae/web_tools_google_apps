function sendRequest(code) {
  var url = 'https://test-drive-live-api-server.onrender.com/api/verify-code';
  var options = {
    'method' : 'post',
    'headers': {'Content-Type': 'application/json'},
    'payload' : JSON.stringify({"code":code})
  };
  var response = UrlFetchApp.fetch(url, options);
  return {
    "code": code,
    "status": response.getResponseCode(),
    "message": response.getContentText()
  };
}

function createTimeDrivenTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  var existingTrigger = null;
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "sendRequest") {
      existingTrigger = triggers[i];
      break;
    }
  }
  if (!existingTrigger) {
    ScriptApp.newTrigger('sendRequest')
      .timeBased()
      .everyMinutes(10)
      .create();
  }
}

function doGet(e) {
  var code = e.parameter.code || "SignalSpectrum"; // Use a default value if no code is provided
  var response = sendRequest(code);
  var template = HtmlService.createTemplateFromFile('Index');
  template.response = response;
  return template.evaluate();
}

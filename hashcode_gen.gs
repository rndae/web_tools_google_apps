function generateCodes() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    var stringToHash = data[i][0] + data[i][1] + data[i][2];
    
    var hashCode = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, stringToHash);
    
    var hexString = '';
    for (var j = 0; j < hashCode.length; j++) {
      var byte = (hashCode[j] & 0xFF).toString(16);
      if (byte.length === 1) {
        byte = '0' + byte;
      }
      hexString += byte;
    }
    
    sheet.getRange(i + 1, 4).setValue(hexString);
  }
}

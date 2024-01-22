const spreadSheet = SpreadsheetApp.openById("1E8Lfa-pay-qEn9QX5p9t9-ZMXhy1sek6dgZjYtkISJA");
const sheetName = "Classic Zeds";

function doGet(e)
{
  const template = HtmlService.createTemplateFromFile('ScheduleBrowser');
  let scheduleTable = spreadSheet.getRange(sheetName + "!B1:32").getValues();
  let date = spreadSheet.getRange(sheetName + "!A1").getValue();
  let dateData = date.split(",");

  for(var i=0; i<scheduleTable.length; i++)
  {
    if(i==0)
    {
      for(var j=0; i==0 && j<scheduleTable[i].length; j++)
      {
        if(scheduleTable[i][j] == "") break;
      }
    }
    scheduleTable[i].length = j;
  }
  dateData.length = 2;

  Logger.log(scheduleTable);
  Logger.log(dateData);

  template.scheduleTable = scheduleTable;
  template.year = dateData[0];
  template.month = dateData[1];

  return template.evaluate();
}

function saveSetting(scheduleList, userName)
{
  let sheet = spreadSheet.getSheetByName(sheetName);
  let memberList = sheet.getRange("B1:1").getValues();
  Logger.log(memberList);
  let userIndex = memberList[0].indexOf(userName);

  for(var i=0; i<scheduleList.length; i++)
  {
    sheet.getRange(i+2, userIndex+2).setValue(scheduleList[i]);
  }
}
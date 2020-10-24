var reporter = require('cucumber-html-reporter');

var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours() + "h" + today.getMinutes() + "m" + today.getSeconds() + "s";
var dateTime = date+'_'+time;

var options = {
  theme: 'bootstrap',
    jsonDir: 'cypress/cucumber-json/',
    output: "cypress/reports/report_"+dateTime+".html",
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    metadata: {
      "Test Environment": "STAGING",
      "Browser": "Chrome  86.0.4240.75",
      "Platform": "Windows 10",
      "Executed": "Local"
    }
  };

reporter.generate(options);
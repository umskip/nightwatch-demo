const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');

// get args, exept first two to pass to cucumber-js
// this cli wrapper is run via node
// argv[0]=node, argv[1]=cucumber-wrapper.js
var args = process.argv.slice(2);

let startDateTime;
let endDateTime;

try{
  // construct cucumber js command line
  const cucumberCommand = `cucumber-js ${args.join(' ')}`;

  console.log(`Executing cucumber-js cli: cucumber-js ${args}`);

  startDateTime = new Date();

  // run cucumber js passing all args
  require('child_process').spawn(cucumberCommand, {
    stdio: 'inherit',
    shell: true
  });
} catch(ignore) {}

/**
 * Generate Report Function
 * 
 * looks for report/cucumber_report.json and uses
 * cucumber-html-reporter to generate a HTML report
 */
function generateReport(code) {
  endDateTime = new Date();
  if (fs.existsSync('report/cucumber_report.json') && !fs.existsSync('report/index.html')) {
    if(fs.existsSync('report/report-options')) {
      const reportOptionsRaw = fs.readFileSync('report/report-options');
      const reportOptionsJson = JSON.parse(reportOptionsRaw);

      reportOptionsJson.customData.data.push({label: 'Start Time', value: startDateTime.toString()});
      reportOptionsJson.customData.data.push({label: 'End Time', value: endDateTime.toString()});

      report.generate(reportOptionsJson);
    }
  }
  process.exit(code);
}

//do something when app is closing
process.on('exit', generateReport);

//catches ctrl+c event
process.on('SIGINT', generateReport);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', generateReport);
process.on('SIGUSR2', generateReport);

//catches uncaught exceptions
process.on('uncaughtException', generateReport);
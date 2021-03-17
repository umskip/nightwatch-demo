const fs = require('fs');
const os = require('os');
const { setDefaultTimeout, After, AfterAll, Before, BeforeAll } = require('cucumber');
const { client, createSession, closeSession, startWebDriver, stopWebDriver, getNewScreenshots } = require('nightwatch-api');
const report = require('multiple-cucumber-html-reporter');
const chalk = require('chalk');
const { _ } = require('lodash');
const assert = require('assert');

const pjson = require('./package.json');

setDefaultTimeout(3600000);

let startDateTime;
let endDateTime;

BeforeAll(async () => {
    startDateTime = new Date();
    await startWebDriver({ env: process.env.NIGHTWATCH_ENV || 'chromeHeadless' });
});

Before(async function (scenario) {
    // create sesssion
    await createSession();

    await client.session(function (result) {
        // store sesssion info global so the html report can use it later
        client.globals.session = result.value;
    });

    const ParallelSlaves = process.env.CUCUMBER_PARALLEL_SLAVES;
    const reportOptions = {
        jsonDir: 'report/',
        reportPath: 'report/',
        useCDN: true,
        displayDuration: true,
        pageTitle: `WebUI Automation Tests (${process.env.NIGHTWATCH_LAUNCHURL || ''})`,
        reportName: `WebUI Automation Tests (${process.env.NIGHTWATCH_LAUNCHURL || ''})`,
        metadata: {
            browser: {
                name: client.globals.session.browserName,
                version: client.globals.session.version
            },
            device: process.env.NIGHTWATCH_SELENIUM_GRID == 'true' ? 'Virtual Machine' : 'Local test Machine',
            platform: {
                name: client.globals.session.platform,
                version: os.release()
            }
        },
        customData: {
            title: 'Run info',
            data: [
                { label: 'Project', value: pjson.name },
                { label: 'Release', value: pjson.version },
                { label: 'Test', value: process.env.ZAL_TESTNAME },
                { label: 'Build', value: process.env.ZAL_BUILDNAME },
                { label: 'Parallel', value: (ParallelSlaves && ParallelSlaves > 1) ? `true (${ParallelSlaves})` : 'false' },
                { label: 'Environment', value: process.env.NIGHTWATCH_LAUNCHURL }
            ]
        }
    }

    if (!fs.existsSync('report/report-options')) {
        fs.writeFileSync('report/report-options', JSON.stringify(reportOptions));
    }

    await client.maximizeWindow();
});

After(async function (scenario) {
    // set cookie to notify Zalenium what the test result is, status icon on Zalenium Dashboard
    if (!client.globals.testResult || client.globals.testResult !== 'failed') {
        // keep global track of the status, only update to passed if we havnt failed.
        client.globals.testResult = scenario.result.status;
    }

    let badLinks = ""

    badLinks += JSON.stringify(client.globals.logs);
    badLinks = (badLinks).split(",").join("\n");

    await this.attach(badLinks);

    // attach screenshots to report
    getNewScreenshots().forEach(file => this.attach(fs.readFileSync(file), 'image/png'));

    await closeSession();
});

AfterAll(async () => {
    endDateTime = new Date();

    if (fs.existsSync('report/cucumber_report.json') && !fs.existsSync('report/index.html')) {
        if (fs.existsSync('report/report-options')) {
            const reportOptionsRaw = fs.readFileSync('report/report-options');
            const reportOptionsJson = JSON.parse(reportOptionsRaw);

            reportOptionsJson.customData.data.push({ label: 'Start Time', value: startDateTime.toString() });
            reportOptionsJson.customData.data.push({ label: 'End Time', value: endDateTime.toString() });

            setTimeout(() => {
                report.generate(reportOptionsJson);
            }, 1000);
        }
    }
    await stopWebDriver();
});

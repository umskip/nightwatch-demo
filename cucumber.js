let common = `
--require-module @babel/register 
--require cucumber.conf.js 
--require node_modules/@opengi/nightwatch-steps-lib/step_definitions 
--require step_definitions 
--format json:report/cucumber_report.json 
--format node_modules/cucumber-junit-formatter:report/TEST-report.xml 
--format-options '{"colorsEnabled": false, "scenarioAsStep": true, "withPackage": true, "propertiesInTestcase": true}' 
`;

const ParallelSlaves = process.env.CUCUMBER_PARALLEL_SLAVES
common = (ParallelSlaves && ParallelSlaves > 1)? `${common} --parallel ${ParallelSlaves}` : `${common}`,

module.exports = {
  'default': `${common}`,
  rerun: `${common} --format rerun:report/@rerun.txt`,
  dry: `${common} --dry-run`,
  progress: `${common} --format progress`
};
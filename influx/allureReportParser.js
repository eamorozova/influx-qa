import fs from 'fs';
/**
 * @typedef {Object} SuiteInfo
 * @property {number} duration test duration in ms
 * @property {string} name test name
 * @property {string} status test status
 * @property {number} statusCode integer test status 
 * @property {number} timeStart time of test start in ms
 * @property {number} timeStop time of test end in ms
 */

/**
 * Reads file with allure results data
 * @param {string} allureReportDir path to allure-report directory
 * @returns paresed JSON file data/suites.json
 */
const readAllureReport = (allureReportDir) => {
  try {
    const data = fs.readFileSync(`${allureReportDir}/data/suites.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Transforms allure test status to int
 * @example
 * passed: 0
 * failed: 1
 * broken: 2
 * skipped: 3
 * @param {string} status 
 * @returns {number} int status
 */
const testStatusToInt = (status) => {
  const statusCodes = {
    passed: 0,
    failed: 1,
    broken: 2,
    skipped: 3,
  }

  return statusCodes[status];
}

/**
 * Parses allure report files
 * @param {string} allureReportDir path to allure-report directory
 * @returns {Array<SuiteInfo>} array of all suits results 
 */
export const allureReportParser = (allureReportDir) => {
  const data = readAllureReport(allureReportDir);

  const suitesInfo = [];

  data.children.forEach((file) => {
    file.children.forEach((suite) => {
      suitesInfo.push({
        duration: suite.time.duration,
        name: suite.name,
        status: suite.status,
        statusCode: testStatusToInt(suite.status),
        timeStart: suite.time.start,
        timeStop: suite.time.stop,
      });
    })
  })

  return suitesInfo;
}

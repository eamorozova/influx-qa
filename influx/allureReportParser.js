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

const readDir = (pathToDir) => {
  try {
    const data = fs.readdirSync(pathToDir)
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

const readFile = (pathToFile) => {
  try {
    const data = fs.readFileSync(pathToFile, 'utf8');
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
  const suitesInfo = [];

  const filenames = readDir(`${allureReportDir}/data/test-cases`);
  console.log(filenames);

  filenames.forEach((filename) => {
    const testCase = readFile(`${allureReportDir}/data/test-cases/${filename}`);
    const testCaseData = {};

    testCaseData.name = testCase.name;
    testCaseData.duration = testCase.time.duration;
    testCaseData.timeStart = testCase.time.start;
    testCaseData.flaky = testCase.flaky;
    testCaseData.statusCode = testStatusToInt(testCase.status);

    testCase.labels.forEach((label) => {
      testCaseData[label.name] = label.value;
    })

    suitesInfo.push(testCaseData);
  })

  return suitesInfo;
}

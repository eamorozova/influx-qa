import { allureReportParser } from "../influx/allureReportParser";

test.only('skipped example', () => {
  allureReportParser('allure-report/data/suites.json');
  expect(3 + 2).toBe(5);
});
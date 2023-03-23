import { InfluxDB, Point, HttpError } from '@influxdata/influxdb-client'
import { url, token, org, bucket } from '../config/index.js'
import { allureReportParser } from './allureReportParser.js';

const parsedSuites = allureReportParser('allure-report');

const writeApi = new InfluxDB({url: url, token: token}).getWriteApi(org, bucket, 'ms');

console.log('Writing to InfluxDB...');

parsedSuites.forEach((suite) => {
  const point = new Point('suite')
    .tag('name', suite.name)
    .tag('status', suite.status)
    .intField('duration', suite.duration)
    .intField('statusCode', suite.statusCode)
    .timestamp(suite.timeStart);

  writeApi.writePoint(point);
  console.log(`${point}`);
}) 

try {
  await writeApi.close()
  console.log('Finished');
} catch (e) {
  console.error(e);
  if (e instanceof HttpError && e.statusCode === 401) {
    console.log('Setup a new InfluxDB database');
  }
  console.log('Finished with error');
}

import { InfluxDB } from "@influxdata/influxdb-client";

class Influx {
  constructor(url, token, org) {
    this.client = new InfluxDB({url, token})
    this.org = org;
    this.writeAPI = this.client.getWriteApi
  }

  pushLines(measure, bucket, data) {
    console.log('Запись в Influx...');

    data.testCases.forEach((testCase) => {
      const tags = {
        'name': testCase.name,
        'fullName': testCase.fullName,
        'status': testCase.status,
        'flaky': testCase.flaky,
      };

      testCase.labels.forEach((label) => {
        tags[label.name] = label.value;
      })

      const fields = {
        duration: testCase.time.duration,
        statusCode: this.statusToInt(testCase.status),
      };

      const data = [];

      data.push(measure, tags, fields, testCase.time.start);
      console.log(data);
      // this.client.getWriteApi(this.org, bucket).writeRecords(data);
    });
  }

  statusToInt(status) {
    const statusCodes = {
      passed: 0,
      failed: 1,
      broken: 2,
      skipped: 3,
    }

    return statusCodes[status];
  }
}
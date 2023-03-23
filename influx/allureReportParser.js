import fs from 'fs';

export const allureReportParser = (sutesJsonPath) => {
  const data = fs.readFileSync(sutesJsonPath);
  const parsedData = JSON.parse(data);

  const result = [];

  parsedData.children.forEach((file) => {
    file.children.forEach((suite) => {
      result.push({name: suite.name, status: suite.status});
    })
  })
  console.log(result);
}
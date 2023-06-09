import { Severity } from "jest-allure/dist/Reporter";

async function wait(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}

test('adds 1 + 2 to equal 3', async () => {
  expect(1 + 2).toBe(3);
});

test('adds 1 + 2 to equal 3 in random time', async () => {
  await wait(Math.floor(Math.random() * 10000) + 100);

  expect(1 + 2).toBe(3);
});

test('adds 3 + 2 to equal 5 in 10 seconds', async () => {
  await wait(10000);

  expect(3 + 2).toBe(5);
});

test('adds 3 + 4 to equal 9', async() => {
  await wait(Math.floor(Math.random() * 10000) + 100);

  expect(3 + 4).toBe(9);
});

test.skip('skipped example', () => {
  expect(3 + 2).toBe(5);
});

test('adds 3 + 4 to equal 7', async() => {
  await wait(Math.floor(Math.random() * 10000) + 100);

  reporter
    .description('This test adds 3 + 4 and expects to equal 9')
    .severity(Severity.Critical)
    .feature('Magic Feature')
    .story('BOND-007');

  expect(3 + 4).toBe(7);
});

test('adds 4 + 4 to equal 8', () => {
  reporter
    .description('This test adds 3 + 4 and expects to equal 9')
    .severity(Severity.Critical)
    .feature('Awesome Feature')
    .story('BOND-007');

  expect(4 + 4).toBe(8);
});

test('adds 5 + 4 to equal 9', async () => {
  await wait(Math.floor(Math.random() * 10000) + 100);

  reporter
    .description('This test adds 3 + 4 and expects to equal 9')
    .severity(Severity.Critical)
    .feature('Incredible Feature')
    .story('BOND-007');

  expect(5 + 4).toBe(9);
});


test('adds 6 + 4 to equal 10', async () => {
  await wait(Math.floor(Math.random() * 10000) + 100);

  reporter
    .description('This test adds 3 + 4 and expects to equal 9')
    .severity(Severity.Critical)
    .feature('Feature 1')
    .story('BOND-008');

  expect(6 + 4).toBe(10);
});

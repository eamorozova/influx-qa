test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('adds 3 + 2 to equal 5', () => {
  expect(3 + 2).toBe(5);
});

test('adds 3 + 4 to equal 9', () => {
  expect(3 + 4).toBe(9);
});

test.skip('skipped example', () => {
  expect(3 + 2).toBe(5);
});
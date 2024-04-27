const printProfile = require("./profile");

test('tests to print out profile of the user', async () => {
    const mock = jest.fn();
    printProfile(mock);
    expect(mock).toHaveBeenCalled();
  })
const histPull = require('./formHistoryPull')

jest.setTimeout(1000000);

test('tests if request is sent to the server', async () => {
    const mock = jest.fn();
    histPull(mock);
    expect(mock).toHaveBeenCalled();
  })
const history = require('./fuelForm')


test('tests for user to submit a fuel quote form', async () => {
    const mock = jest.fn();
    history.calPricePerGallon(mock);
    history.submitForm(mock);
    // history.fuelQuoteHist(mock);
    expect(mock).toHaveBeenCalled();
  })
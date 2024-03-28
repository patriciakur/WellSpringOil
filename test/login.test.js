// const { TestWatcher } = require('jest')
// const puppeteer = require('puppeteer')
const login = require('./login')

// const history = require('./history')
// const printaddress = require('./printaddress')
// const profile = require('./profile')
// const validation = require('./validations')
jest.setTimeout(1000000);

test('tests if username and password inputed in the gui are sent to the server', async () => {
    const mock = jest.fn();
    login(mock);
    expect(mock).toHaveBeenCalled();
  })
const validation = require('./validation');


test('tests for input validations', async () => {
    expect(validation.containsChar('a1423@$b')).toEqual(true);
    expect(validation.containsChar('512@$%^*(')).toEqual(false);
    expect(validation.containsSpecialChars('njguw224!')).toEqual(true);
    expect(validation.containsSpecialChars('7278grvv')).toEqual(false);
    expect(validation.containsSpecialCharsNumbers('rhi2aaa')).toEqual(true);
    expect(validation.containsSpecialCharsNumbers('hwongwo')).toEqual(false);
    expect(validation.containsSpace('hrjr tot')).toEqual(true);
    expect(validation.containsSpace('gwegjweio')).toEqual(false);
  })
  
  test('tests if username exists', async () => {
    const mock = jest.fn();
    validation.UserNameExist(mock,'dinhbui');
    expect(mock).toHaveBeenCalled();
  })
  
  test('tests if username and password are valid', async () => {
    const mock = jest.fn();
    validation.checkValidsUserPwd(mock, 'dinhbui', 'Dinh1', 'Dinh1');
    expect(mock).toHaveBeenCalled();
  })
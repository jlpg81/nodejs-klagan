const controllers = require('./controllers/controllers');

test('tests login', async () => {
  let req = {};
  let res = {};
  res.json = (input) => (res.json = input);
  req.body = { username: 'dare', password: 's3cr3t' };
  await controllers.login(req, res);
  expect(res.json.type).toBe('Bearer');
});

test('tests login with wrong password', async () => {
  let req = {};
  let res = {};
  res.status = () => res;
  res.json = (input) => (res.json = input);
  req.body = { username: 'dare', password: 'secret' };
  await controllers.login(req, res);
  expect(res.json.message).toBe('invalid secret or client id');
});

const axios = require('axios').default;
const jwt = require('./jwt');

const apiLogin = async (client_id, client_secret) => {
  const data = await axios({
    method: 'post',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/login',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      client_id,
      client_secret,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
    });
  return data;
};

const apiClients = async (req, res) => {
  let token = jwt.readToken();

  const data = await axios({
    method: 'get',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/clients',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
    });
  return data;
};

const apiPolicies = async (req, res) => {
  let token = jwt.readToken();

  const data = await axios({
    method: 'get',
    url: 'https://dare-nodejs-assessment.herokuapp.com/api/policies',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: token,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
    });
  return data;
};

module.exports = { apiLogin, apiClients, apiPolicies };

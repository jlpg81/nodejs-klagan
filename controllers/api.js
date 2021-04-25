const axios = require('axios').default;
const jwt = require('./jwt');
const fetch = require('node-fetch');

const apiLogin = async (client_id, client_secret) => {
  const body = {
    client_id: client_id,
    client_secret: client_secret,
  };
  const data = await fetch(
    'https://dare-nodejs-assessment.herokuapp.com/api/login',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
    .then((res) => {
      return res.json();
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

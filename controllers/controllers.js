const jwt = require('./jwt');
const { apiLogin, apiClients, apiPolicies } = require('./api');

const verifyError = (result, req, res) => {
  if (result.status >= 400) {
    res.status(result.status).json({
      code: 0,
      message: result.data.message,
    });
  }
};

const login = async (req, res) => {
  const apiResult = await apiLogin(req.body.username, req.body.password);

  if (apiResult.token) {
    jwt.writeToken(`${apiResult.type} ${apiResult.token}`);
    res.json({
      token: apiResult.token,
      type: apiResult.type,
      expires_in: 0,
    });
  }

  // if (apiResult.status === 400 || apiResult.status === 401) {
  //   res.status(apiResult.status).json({
  //     code: 0,
  //     message: apiResult.data.message,
  //   });
  // }
  verifyError(apiResult, req, res);
};

const getAllPolicies = async (req, res) => {
  const data = await apiPolicies();
  if (!data.status || data.status === 200) {
    res.send(data);
  }

  // if (data.status === 401 || data.status === 402 || data.status === 403) {
  //   res.status(data.status).json({
  //     code: 0,
  //     message: data.data.message,
  //   });
  // }

  verifyError(data, req, res);
};

// const getAllPolicies = async (req, res) => {
//   let token = jwt.readToken();
//   console.log('token', token);
//   console.log('getAllPolicies');

//   res.json([
//     {
//       id: 'string',
//       amountInsured: 'string',
//       email: 'string',
//       inceptionDate: 'string',
//       installmentPayment: true,
//     },
//   ]);
// };

const getPolicyById = async (req, res) => {
  const data = await apiPolicies();

  verifyError(data, req, res);

  if (!data.status || data.status === 200) {
    const result = data.filter((data) => data.id === req.params.id);
    res.send(result);
  }
};

const getClients = (req, res) => {
  res.json([
    {
      id: 'string',
      name: 'string',
      email: 'string',
      role: 'string',
      policies: [
        {
          id: 'string',
          amountInsured: 'string',
          inceptionDate: 'string',
        },
      ],
    },
  ]);
};

const getClientById = (req, res) => {
  res.json([
    {
      id: 'string',
      name: 'string',
      email: 'string',
      role: 'string',
      policies: [
        {
          id: 'string',
          amountInsured: 'string',
          inceptionDate: 'string',
        },
      ],
    },
  ]);
};

const getClientPolicyList = (req, res) => {
  res.json([
    {
      id: 'string',
      amountInsured: 'string',
      email: 'string',
      inceptionDate: 'string',
      installmentPayment: true,
    },
  ]);
};

module.exports = {
  login,
  getAllPolicies,
  getPolicyById,
  getClients,
  getClientById,
  getClientPolicyList,
};

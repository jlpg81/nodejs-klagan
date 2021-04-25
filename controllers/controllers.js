const jwt = require('./jwt');
const { apiLogin, apiClients, apiPolicies } = require('./api');

const verifyError = (result, req, res) => {
  if (result.status >= 400) {
    res.status(result.status).json({
      code: 0,
      message: result.data.message,
    });
  }
  // added this at the last minute because I used node-fetch for the test
  if (result.statusCode >= 400) {
    res.status(result.statusCode).json({
      code: 0,
      message: result.message,
    });
  }
};

// Route: /login
const login = async (req, res) => {
  const apiResult = await apiLogin(req.body.username, req.body.password).then();
  if (apiResult.token) {
    jwt.writeToken(`${apiResult.type} ${apiResult.token}`);
    res.json({
      token: apiResult.token,
      type: apiResult.type,
      expires_in: 0,
    });
  }

  verifyError(apiResult, req, res);
};

// Route: /policies
const getAllPolicies = async (req, res) => {
  const data = await apiPolicies();
  if (!data.status || data.status === 200) {
    res.send(data);
  }

  verifyError(data, req, res);
};

// Route: /policies/:id
const getPolicyById = async (req, res) => {
  const data = await apiPolicies();

  verifyError(data, req, res);

  if (!data.status || data.status === 200) {
    const result = data.filter((data) => data.id === req.params.id);
    if (result[0]) {
      res.send([
        {
          id: result[0].id,
          amountInsured: result[0].amountInsured,
          email: result[0].email,
          inceptionDate: result[0].inceptionDate,
          installmentPayment: result[0].installmentPayment,
        },
      ]);
    } else {
      res.status(404).json({
        code: 0,
        message: 'ID not found',
      });
    }
  }
};

// Route: /clients
const getClients = async (req, res) => {
  const data = await apiClients();
  if (!data.status || data.status === 200) {
    res.send(data);
  }

  verifyError(data, req, res);
};

// Route: /clients/:id
const getClientById = async (req, res) => {
  const data = await apiClients();

  verifyError(data, req, res);

  if (!data.status || data.status === 200) {
    const result = data.filter((data) => data.id === req.params.id);

    if (result[0]) {
      // if the customer was found, we look for its policies
      const policiesList = await apiPolicies();
      const userPolicies = policiesList.filter(
        (policiesList) => policiesList.clientId === req.params.id
      );
      if (userPolicies) {
        // if the customer has at least 1 policy, we adapt the format to what is required
        const adaptedPolicies = [];
        userPolicies.forEach((item) => {
          adaptedPolicies.push({
            id: item.id,
            amountInsured: item.amountInsured,
            inceptionDate: item.inceptionDate,
          });
        });
        result[0].policies = adaptedPolicies;
        res.send(result);
      } else {
        res.send(result);
      }
    } else {
      res.status(404).json({
        code: 0,
        message: 'ID not found',
      });
    }
  }
};

// Route: /clients/:id/policies
const getClientPolicyList = async (req, res) => {
  data = await apiClients();

  verifyError(data, req, res);

  if (!data.status || data.status === 200) {
    const result = data.filter((data) => data.id === req.params.id);

    if (result[0]) {
      // if the customer was found, we look for its policies
      const policiesList = await apiPolicies();
      const userPolicies = policiesList.filter(
        (policiesList) => policiesList.clientId === req.params.id
      );
      if (userPolicies) {
        // if the customer has at least 1 policy, we adapt the format to what is required
        const adaptedPolicies = [];
        userPolicies.forEach((item) => {
          adaptedPolicies.push({
            id: item.id,
            amountInsured: item.amountInsured,
            email: item.email,
            inceptionDate: item.inceptionDate,
            installmentPayment: item.installmentPayment,
          });
        });
        res.send(adaptedPolicies);
      }
    } else {
      res.status(404).json({
        code: 0,
        message: 'ID not found',
      });
    }
  }
};

module.exports = {
  login,
  getAllPolicies,
  getPolicyById,
  getClients,
  getClientById,
  getClientPolicyList,
};

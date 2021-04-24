var express = require('express');
var router = express.Router();

const {
  login,
  getAllPolicies,
  getPolicyById,
  getClients,
  getClientById,
  getClientPolicyList,
} = require('../controllers/controllers');

router.post('/login', login);

router.get('/policies', getAllPolicies);
router.get('/policies/:id', getPolicyById);

router.get('/clients', getClients);
router.get('/clients/:id', getClientById);
router.get('/clients/:id/policies', getClientPolicyList);

router.post('/api/v1/login', login);
router.get('/api/v1/policies', getAllPolicies);
router.get('/api/v1/policies/:id', getPolicyById);
router.get('/api/v1/clients', getClients);
router.get('/api/v1/clients/:id', getClientById);
router.get('/api/v1/clients/:id/policies', getClientPolicyList);

module.exports = router;

const express = require('express');
const router = express.Router();

const EmployeesControllers = require('../controllers/employees.controllers');

router.get('/employees', EmployeesControllers.getAll);

router.get('/employees/random', EmployeesControllers.getRandom);

router.get('/employees/:id', EmployeesControllers.getById);

router.post('/employees', EmployeesControllers.postNewRecord);

router.put('/employees/:id', EmployeesControllers.putById);

router.delete('/employees/:id', EmployeesControllers.deleteById);

module.exports = router;

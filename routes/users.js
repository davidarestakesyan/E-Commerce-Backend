const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const cors = require("cors")
router.use(cors())
const jwt_authenticate = require ("../jwt/jwt_authenticate")

router.post('/register', usersController.createUser);
router.post('/login', usersController.loginUser);
router.get('/allusers',
jwt_authenticate.authenticateAdminToken,
usersController.getAllUsers);
router.get('/singleuser/:id', 
jwt_authenticate.authenticateAdminToken,
usersController.getUserById);
router.delete('/deleteuser/:id',
jwt_authenticate.authenticateAdminToken,
usersController.deleteUser);
module.exports = router;




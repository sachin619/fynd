/* call express router */
const router= require('express').Router();
/* get the method from controller */
const {createUser,login,getUserById}=require('./user.controller');
 /* verify the token */
const {verifyToken} = require('../auth/tokenverify');

 /* user create route */
router.post('/create',verifyToken, createUser);

/* get user by id */
router.get('/:id',verifyToken,getUserById);

/* login route */
router.post('/login',login);

/* export the router */
module.exports=router;
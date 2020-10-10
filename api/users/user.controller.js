/* call methods from model */
const { create, getUserByEmailId, getUserById } = require('./user.service');
/* library for creating hash for the password */
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
/* library for creating JWt token */
const { sign } = require('jsonwebtoken');
module.exports = {

    /* create user */
    createUser: (req, res) => {

        /* User body */
        const body = req.body;

        /* password encrypt */
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        /* user service */
        create(body, (error, result) => {
            if (error) {
                return res.status(200).send({
                    type: 'error',
                    message: 'Someting goes wrong please try again later',
                    details: error
                });
            }
            return res.status(200).send({
                type: 'success',
                message: 'Data inserterd',
                data: result
            });

        })
    },
    /* login */
    login: (req, res) => {
        var getEmailId = req.body.email;
        /* check if email is valid and get user details */
        getUserByEmailId(getEmailId, (error, results) => {
            if (error) {
                res.status(200).send({
                    type: 'error',
                    message: 'Invalid Login Credentials'
                });
            }
            if (results && results.length > 0) {
                var result = results[0];
                /* check entered password with the db hash password */
                var checkPassword = compareSync(req.body.password, result.password);
                if (checkPassword) {
                    result.password = undefined;
                    /* generate token */
                    let genToken = sign({ result: result }, 'asdf1234', {
                        expiresIn: '1hr'
                    })
                    res.status(200).send({
                        data: result,
                        token: genToken,
                        type: 'success',
                    })
                } else {
                    res.status(200).send({
                        type: 'error',
                        message: 'Invalid Login Credentials'
                    });
                }
            } else {
                res.status(200).send({
                    type: 'error',
                    message: 'Invalid Login Credentials'
                });
            }
        })
    },

    getUserById: (req, res) => {
        getUserById(req.params.id, (error, result) => {
            if (error) {
                return res.send({
                    type: 'error',
                    message: 'Someting goes wrong please try again later',
                    details: error
                })
            }
            return res.send({
                type: 'success',
                message: 'Data received',
                details: result
            })
        })
    }
}
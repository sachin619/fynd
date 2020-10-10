/* call methods from model */
const { createMovie, readMovie, updateMovie,deleteMovie} = require('./movie.service');
/* library for creating hash for the password */
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
/* library for creating JWt token */
const { sign } = require('jsonwebtoken');
module.exports = {

    /* create movie */
    createMovie: (req, res) => {

        /* User body */
        const body = req.body;

        /* user movie */
        createMovie(body, (error, result) => {
            if (error) {
                return res.status(500).send({
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

    readMovie: (req, res) => {
        let body=req.body;
        readMovie(body, (error, result) => {
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
    },
    updateMovie: (req, res) => {
        let body=req.body;
        updateMovie(body, (error, result) => {
            if (error) {
                return res.send({
                    type: 'error',
                    message: 'Someting goes wrong please try again later',
                    details: error
                })
            }
            return res.send({
                type: 'success',
                message: 'Data updated',
                details: result
            })
        })
    },
    deleteMovie: (req, res) => {
        let id=req.params.id;
        deleteMovie({id:id}, (error, result) => {
            if (error) {
                return res.send({
                    type: 'error',
                    message: 'Someting goes wrong please try again later',
                    details: error
                })
            }
            return res.send({
                type: 'success',
                message: 'Data deleted successfully',
                details: result
            })
        })
    }
}
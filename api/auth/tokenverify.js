const { verify } = require('jsonwebtoken');
module.exports = {
    verifyToken: (req, res, next) => {
        console.log(req.url)
        if (req.url != '/user/login' && req.url != '/movies') {

            var getToken = req.get('authorization');
            if (getToken) {
                var getToken = getToken.slice(7);
                verify(getToken, 'asdf1234', (error, data) => {
                    if (error) {
                        res.send({
                            type: 'error',
                            message: 'Invalid token'
                        })
                    } else {
                        next();
                    }
                })

            } else {
                res.send({
                    type: 'error',
                    message: 'No token found'
                });
            }
        } else {
            next();
        }


    }
}
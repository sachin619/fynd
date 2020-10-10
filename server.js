const {verifyToken} = require('./api/auth/tokenverify');
/* env file */
const dotEnv=require('dotenv');
dotEnv.config();

/* express instantiate */
const express=require('express');
const app=express();

/* allow cors */
var cors = require('cors');
app.use(cors());

/* get user request body of Form Data */
var bodyParser = require('body-parser');
app.use(bodyParser.json());

/* get user request body of JSON format */
app.use(express.json());

/* auth middleware */
app.use(verifyToken)

/* create user route */
const userRoute=require('./api/users/user.route');
const moviesRoute=require('./api/movies/movie.route');
app.use('/user',userRoute);
app.use('/movies',moviesRoute);

 /* start the server on corresponding port number */
 var port=process.env.PORT || process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`);
});

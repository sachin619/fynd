/* call express router */
const router= require('express').Router();
/* Movie Controller */
const MovieController=require('./movie.controller');
/* Movies Route */
router.post('/', MovieController.readMovie);
router.post('/create', MovieController.createMovie);
router.post('/update', MovieController.updateMovie);
router.post('/delete/:id', MovieController.deleteMovie);
/* export the router */
module.exports=router;
const  Router  = require('express');
const { pagesController } = require('../controllers/pagesController');

const pageRouter = new Router();


pageRouter.get("/", pagesController.getIndex);
pageRouter.get("/home", pagesController.getHome);
pageRouter.get("/logout", pagesController.logout);
pageRouter.get("/experiment",  pagesController.experiment);
pageRouter.get("/manage_experiments",  pagesController.experimentManagement);
pageRouter.get("/edit_experiment",  pagesController.experimentEdit);
pageRouter.get("/add_experiment",  pagesController.experimentAdd);
pageRouter.get("/*", pagesController.getError);


module.exports = { pageRouter };

const Logger = require("../logger/Logger");
const logger = new Logger();

exports.pagesController = {

    getIndex(req, res) {
        if(req.session.hasOwnProperty("userId")) {
            logger.log("redirect login page to home page after login");
            res.render("home", {userType: req.session.type, userId: req.session.userId});
        }
        else{
            logger.log("getting login page");
            res.render("index");
        }
    },

    getHome(req, res) {
        if(!req.session.hasOwnProperty("userId")){
            logger.log("redirect to login page before login");
            res.redirect("/");
        }
        else{
            logger.log("getting home page after login");
            res.render("home", { userType: req.session.type, userId: req.session.userId });
        }
    },

    getError(req, res) {
        res.render("404");
    },
    experimentManagement(req, res) {
        if(!req.session.hasOwnProperty("userId")){
            logger.log("redirect to login page before login");
            res.redirect("/");
        }
        else {
            logger.log("getting manage_experiments page after login");
            res.render("manage_experiments");
        }
    },

    experimentEdit(req, res) {
        if(!req.session.hasOwnProperty("userId")){
            logger.log("redirect to login page before login");
            res.redirect("/");
        }
        else if ( req.session.type != "manager"){
            logger.log("failed authentication on edit_experiment redirect to home page");
            res.redirect("/home");
        }
        else {
            logger.log("getting edit_experiment page after login");
            res.render("edit_experiment");
        }
    },
    experimentAdd(req, res) {
        if(!req.session.hasOwnProperty("userId")){
            logger.log("redirect to login page before login");
            res.redirect("/");
        }
        else if ( req.session.type != "manager"){
            logger.log("failed authentication on add_experiment redirect to home page");
            res.redirect("/home");
        }
        else {
            logger.log("getting add_experiment page after login");
            res.render("add_experiment");
        }
    },
    logout(req, res) {
        if(req.session.hasOwnProperty("userId"))
            req.session.destroy();
        logger.log("redirect to login page before logout");
        res.redirect("/");
    }
}

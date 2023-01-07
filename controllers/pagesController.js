
exports.pagesController = {

    getIndex(req, res) {
        if(req.session.hasOwnProperty("userId"))
            res.render("home", { user: req.session.userInfo });
        else
        res.render("index");
    },

    getHome(req, res) {
        if(!req.session.hasOwnProperty("userId"))
            res.render("index");
        else
            res.render("home", { userType: req.session.type, userId: req.session.id });
    },

    getError(req, res) {
        res.render("404");
    }
}

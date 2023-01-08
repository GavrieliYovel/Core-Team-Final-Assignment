
exports.pagesController = {

    getIndex(req, res) {
        if(req.session.hasOwnProperty("userId"))
            res.render("home", { userType: req.session.type, userId: req.session.id });
        else
        res.render("index");
    },

    getHome(req, res) {
        if(!req.session.hasOwnProperty("userId"))
            res.redirect("/");
        else {
            res.render("home", { userType: req.session.type, userId: req.session.userId });
        }

    },

    getError(req, res) {
        res.render("404");
    },
    experimentManagement(req, res) {
        if(!req.session.hasOwnProperty("userId"))
            res.redirect("/");
        else
            res.render("manage_experiments");
    },

    experimentEdit(req, res) {
        if(!req.session.hasOwnProperty("userId"))
            res.redirect("/");
        else
            res.render("edit_experiment");
    },
    experimentAdd(req, res) {
        if(!req.session.hasOwnProperty("userId"))
            res.redirect("/");
        else if ( req.session.type !== "manager")
            res.redirect("/home");
        else
            res.render("add_experiment");
    },
    logout(req, res) {
        if(req.session.hasOwnProperty("userId"))
            req.session.destroy();
        res.redirect("/");
    }
}

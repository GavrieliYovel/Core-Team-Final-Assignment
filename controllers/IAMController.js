exports.IAMController = {
    login(req, res) {
        req.session.type = 'manager';
        req.session.plan = 'free';
    }
}

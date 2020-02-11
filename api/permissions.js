module.exports = {
    createGuards: (authenticated) => {
        return {
            authenticated: authenticated,
            admin: (req, res, next) => {
                if (req && req.user && req.user.group === 'admin') {
                    next();
                } else {
                    res.redirect('/');
                }
            },
            manager: (req, res, next) => {
                if (req && req.user && (req.user.group === 'manager' || req.user.group === 'admin')) {
                    next();
                } else {
                    res.redirect('/');
                }
            }
        };
    }
};

module.exports = {
    createGuards: (authenticated) => {
        return {
            authenticated: authenticated,
            admin: (req, res, next) => {
                if (req.user.group === 'admin') {
                    next();
                } else {
                    res.status(401).json({
                        error: `Insufficient permissions. Access requires admin permissions, but you have ${req.user.group} permissions`
                    });
                }
            },
            manager: (req, res, next) => {
                if (req.user.group === 'manager' || req.user.group === 'admin') {
                    next();
                } else {
                    res.status(401).json({
                        error: `Insufficient permissions. Access requires manager permissions, but you have ${req.user.group} permissions`
                    });
                }
            }
        };
    }
};

// ...existing code...

exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
        return next();
    }
    res.redirect('/login');
};

// ...existing code...
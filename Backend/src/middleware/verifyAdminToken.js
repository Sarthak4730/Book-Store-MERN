const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'b0bde294c96b1c79cfc7328c93ca969104dbc0d4314002302135a71547f5491d719caa7d02b4c68904ce8dd4988aca5d514ae17b4291f68590d12420a6d1e1c7';

const verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if( !token ) return res.status(401).json( { message: 'access denied, no token provided' } );
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json( { message: 'invalid credentials' } );
        if(!user) return res.status(403).json( { message: 'user falsy' } );
        if (user.role !== 'admin') return res.status(403).json({ message: 'Access Denied, role not admin' });
        req.user = user;
        next();
    });
}

module.exports = verifyAdminToken;
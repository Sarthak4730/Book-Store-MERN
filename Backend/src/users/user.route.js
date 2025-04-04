const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();
// in terminal, type 'node' to enter the shell, then type 'require('crypto').randomBytes(64).toString('hex')', to get:
const JWT_SECRET_KEY = 'b0bde294c96b1c79cfc7328c93ca969104dbc0d4314002302135a71547f5491d719caa7d02b4c68904ce8dd4988aca5d514ae17b4291f68590d12420a6d1e1c7';

router.post('/admin', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const admin = await User.findOne( { username } );

        if( !admin ) return res.status(404).send( { message: 'Admin Not Found' } );
        
        if(admin.password !== password) return res.status(401).send( { message: 'Invalid Password' } ); 

        const token = jwt.sign( {id: admin._id, username: admin.username, role: admin.role}, JWT_SECRET_KEY, { expiresIn: '1h' } );
        return res.status(200).json( { message: 'admin authentication success', token, user: { username: admin.username, role: admin.role } } );
    } catch (error) {
        console.error('Failed at post/admin', error);
        return res.status(401).send( { message: 'error at post/admin' } );
    }
});

module.exports = router;
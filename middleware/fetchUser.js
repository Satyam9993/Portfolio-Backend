const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = (req, res, next) => {
    // get the user from the jwt token
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "access denied1" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "access denied1" })
    }
}

module.exports = fetchuser;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(403).send({ message: "Unauthorized User" })
    }
    let token = req.headers.authorization.split(" ")[1]
    if(token === null) {
        return res.status(403).send({message:"Unauthorized User"})
    }
    try {
        let payload = jwt.verify(token, "jwt-secret-key");
        if(!payload) {
            return res.status(403).send({message:"Unauthorized User"})
        }
        if (payload.exp <= Date.now() / 1000) {
            return res.status(403).send({ message: "Token has expired" });
        }
        req.user_id = payload.subject;
        next();
    } catch (error) {
        return res.status(403).send({ message: "Unauthorized User" });
    }
}

module.exports = verifyToken
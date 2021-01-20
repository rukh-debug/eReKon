const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token)
      return res
        .status(401)
        .json({ msg: "No auth token, auth denied" });
    const verified = jwt.verify(token, process.env.JWT_SECRETS);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, auth denied" });
    }
    req.user = verified.id;
    next();
  }
  catch (e) {
    res.status(500).json({ error: e.message })
  }
}

module.exports = auth;
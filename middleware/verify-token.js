const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded.payload;
    
    // next passes the the request object to the controller function
    // you will have req.user availiable in every single controller function
    // req.user.username
    // req.user._id
    next();
  } catch (err) {
    res.status(401).json({ err: 'Invalid token.' });
  }
}

module.exports = verifyToken;

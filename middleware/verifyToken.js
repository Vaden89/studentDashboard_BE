import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.split(" ")[0] !== "Bearer")
    return res.status(401).send({ error: "Un-Authorized 'No bearer token' " });

  try {
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Un-Authorized 'Invalid token'" });
  }
};

export default verifyToken;

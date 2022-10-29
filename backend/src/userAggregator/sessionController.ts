import * as jwt from "jsonwebtoken";

export const createSession = async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(406).json({ message: "Credentials doesn't match" });
    return;
  }
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
    expiresIn: "60m",
  });

  res.cookie("auth", token, { expires: new Date(Date.now() + 8 * 3600000) });
  res.cookie("userID", user.userID, {
    expires: new Date(Date.now() + 8 * 3600000),
  });

  const response = { message: "OK", name: user.name };

  res.status(200).json(response);
};

export const isLogged = (req, res, next) => {
  const { auth, userID } = req.cookies;
  const decoded = jwt.verify(auth, process.env.TOKEN_SECRET);

  if (decoded.user.userID !== userID) {
    res.cookie("auth", { maxAge: 0 });
    res.cookie("userID", { maxAge: 0 });
    res.status(401).json({ message: "Unauthorized" });
  }

  req.user = decoded.user.userID;
  return next();
};

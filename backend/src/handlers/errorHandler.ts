export const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

export const notFound = (req, res, next) => {
  const err = new Error("Not found");
  res.status(404).json({ error: "Not found" });
  next(err);
};


export const errorHandler =  (err, req, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({error: "Session expired"})
    return;
  }
  const status = err.status || 400
  res.status(status).json({error: err.message})
}

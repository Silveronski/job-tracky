const dd = (res, data) => {
  res.setHeader("Content-Type", "application/json");
  res.status(500).send(JSON.stringify(data, null, 2));
};

module.exports = { dd };

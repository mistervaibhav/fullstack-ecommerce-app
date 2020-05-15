const loadImage = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};

module.exports = {
  loadImage,
};

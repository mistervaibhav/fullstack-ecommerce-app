const loadImage = (req, res, next) => {
  // console.log(
  //   '===================================================================================='
  // );
  // console.log(req.product);
  if (req.product.image.data) {
    res.set('Content-Type', req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};

module.exports = {
  loadImage,
};

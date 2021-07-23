module.exports = function (app) {
  const fileController = require("../controller/index");
  const fileMiddle = require("../Middleware/index");
  app
    .route("/api/img/")
    .get(fileController.getFile)
    .post(fileMiddle.any(), fileController.postFile);
  app
    .route("/api/img/:id")
    .delete(fileController.deleteFile)
    .put(fileMiddle.any(), fileController.putFile);
  app.route("/api/img/id/:id").get(fileController.getOneFile);
};

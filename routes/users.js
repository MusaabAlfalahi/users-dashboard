const express = require("express");
const router = express.Router();
const controller = require("../controllers/users");

router.get("/", controller.getAllUsers);
router.get("/user/add", controller.getAdd);
router.get("/edit/:id", controller.getEdit);
router.get("/view/:id", controller.getView);
router.delete("/user/delete/:id", controller.deleteUser);
router.put("/user/update/:id", controller.updateUser);
router.post("/search", controller.search);
router.post("/user/add.html", controller.addUser);

module.exports = router;

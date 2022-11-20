const router = require("express").Router();
const UserController = require("../controller/userController");

router.post("/create", UserController.createUser);

router.get("/getAll", UserController.getAllUsers);

router.put('/update/:mailid', UserController.updateUser);

router.delete("/delete/:mailid", UserController.deleteUser);

router.post("/authenticate", UserController.authenticateUser);

module.exports = router;
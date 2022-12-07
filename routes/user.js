const express = require("express");
const router = express.Router();


// Here we are using destructuring
const { registerUser, loginUser, getAllUsers, deleteUser } = require("../controller/user");

// router.get("/", userController.getAllUsers)

router.get("/", getAllUsers);



// Registering
router.post("/register", registerUser) //endpoint, function that has an API

// // Login
router.post("/login", loginUser) //endpoint, function that has an API

router.delete('/:id', deleteUser)


// router.get("/:id", userController.getUserById)

// router.put("/:id", userController.updateUser)

// router.delete(":/id", userController.deletUser);

module.exports = router;
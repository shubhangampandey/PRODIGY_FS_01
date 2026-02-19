const express = require("express");
const { getUsers } = require("../controllers/adminController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

router.get("/users", auth, roleCheck("admin"), getUsers);

module.exports = router;

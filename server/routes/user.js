const express = require("express");
const router = express.Router();
const { deleteAccount, changePassword } = require("../controllers/user");

router.route("/delete-account").post(deleteAccount);
router.route("/change-password").post(changePassword);

module.exports = router;

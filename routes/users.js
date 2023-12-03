const express = require("express");

const router = express.Router();

const ROLES_LIST = require("../config/roles-list");
const verifyRoles = require("../middleware/verify-roles");
const verifyJWTMid = require("../middleware/verify-jwt");
const authRegDataValidationMid = require("../middleware/auth-reg-data-validation");
const upload = require("../middleware/file-upload");

const {
  getAllUsers,
  getUser,
  createUser,
  uploadAvatar,
  updateUserData,
  deleteUser,
} = require("../controllers/users-controller");

router.get("/", getAllUsers);
router.post(
  "/",
  verifyJWTMid,
  verifyRoles(ROLES_LIST.Admin),
  authRegDataValidationMid,
  createUser
);
router.get("/:user_id", getUser);
router.patch("/avatar", verifyJWTMid, upload.single("image"), uploadAvatar);

//user can change his login and fullname, admin can change user role. If you want
//to change avatar picture use different endpoint
router.post("/:user_id", verifyJWTMid, updateUserData);

router.delete("/:user_id", verifyJWTMid, deleteUser);
module.exports = router;

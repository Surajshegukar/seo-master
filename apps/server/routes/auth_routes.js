const express = require("express");
const router = express.Router();

const { registerUser, getUser, updateUser , deleteUser } = require("../controllers/admin/auth_controller");

// Register new user
router.post("/auth/register",registerUser);
router.get("/auth/hello",(req,res)=>{
     res.json({ message: "Hello from auth API!" });
});
// Get user profile (protected route example)
router.get("/auth/user/:id", getUser);

// Update user role (admin only - you'll need to add auth middleware)
router.patch("/auth/user/:id/role",updateUser);

// Delete user (admin only)
router.delete("/auth/user/:id", deleteUser);

module.exports = router;
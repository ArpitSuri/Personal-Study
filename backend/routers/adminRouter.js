import express from "express";
import { auth } from "../middleWare/authMiddleware.js";
import { adminOnly } from "../middleWare/adminMiddleware.js";
import { getStats, listUsers, setBlocked, setRole, deleteUser, listLogs } from "../controllers/adminController.js";

const router = express.Router();
router.use(auth, adminOnly);

router.get("/stats", getStats);
router.get("/users", listUsers);
router.patch("/users/:userId/block", setBlocked);
router.patch("/users/:userId/role", setRole);
router.delete("/users/:userId", deleteUser);
router.get("/logs", listLogs);

export default router;
import express from "express"
import { addProject, getAllProject, getProject, updateProject, deleteProject } from "../controllers/projectController.js"
import { verifyAccessToken } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/projects", verifyAccessToken, addProject);
router.get("/projects", verifyAccessToken, getAllProject);
router.get("/projects/:projectId", verifyAccessToken, getProject);
router.put("/projects/:projectId", verifyAccessToken, updateProject);
router.delete("/projects/:projectId", verifyAccessToken, deleteProject);

export default router;
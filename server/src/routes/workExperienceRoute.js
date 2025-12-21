import express from "express"
import { addExperience, getAllWorkExperience, getWorkExperience, updateWorkExperience, deleteWorkExperience } from "../controllers/workExperienceController.js"
import { verifyAccessToken } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/worex", verifyAccessToken, addExperience);
router.get("/worex", verifyAccessToken, getAllWorkExperience)
router.get("/worex/:expId", verifyAccessToken, getWorkExperience)
router.put("/worex/:expId", verifyAccessToken, updateWorkExperience)
router.delete("/worex/:expId", verifyAccessToken, deleteWorkExperience)


export default router;
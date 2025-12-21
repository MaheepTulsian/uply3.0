import express from "express";
import { addSkill, getAllSkill, updateSkill, deleteSkill } from "../controllers/skillController.js"
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/skills", verifyAccessToken, addSkill);
router.get("/skills", verifyAccessToken, getAllSkill);
router.put("/skills/:skillId", verifyAccessToken, updateSkill);
router.delete("/skills/:skillId", verifyAccessToken, deleteSkill);


export default router;
import express from "express";
import { addAward, getAllAward, updateAward, deleteAward } from "../controllers/awardController.js"
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/awards", verifyAccessToken, addAward);
router.get("/awards", verifyAccessToken, getAllAward);
router.put("/awards/:awardId", verifyAccessToken, updateAward);
router.delete("/awards/:awardId", verifyAccessToken, deleteAward);

export default router;
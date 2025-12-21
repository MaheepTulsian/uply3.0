import express from "express";
import { addSocial, getAllSocial, updateSocial, deleteSocial } from "../controllers/socialController.js"
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/socials", verifyAccessToken, addSocial);
router.get("/socials", verifyAccessToken, getAllSocial);
router.put("/socials/:socialId", verifyAccessToken, updateSocial);
router.delete("/socials/:socialId", verifyAccessToken, deleteSocial);




export default router;
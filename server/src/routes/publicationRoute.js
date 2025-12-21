import express from "express";
import { addPublication, getAllPublication, updatePublication, deletePublication } from "../controllers/publicationController.js"
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/publications", verifyAccessToken, addPublication);
router.get("/publications", verifyAccessToken, getAllPublication);
router.put("/publications/:pubId", verifyAccessToken, updatePublication);
router.delete("/publications/:pubId", verifyAccessToken, deletePublication);

export default router;
import express from "express"
import { addExtraCurricular, getAllExtraCurricular, updateExtraCurricular, deleteExtraCurricular } from "../controllers/extraCurricularController.js"
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/extra", verifyAccessToken, addExtraCurricular);
router.get("/extra", verifyAccessToken, getAllExtraCurricular);
router.put("/extra/:extraId", verifyAccessToken, updateExtraCurricular);
router.delete("/extra/:extraId", verifyAccessToken, deleteExtraCurricular);





export default router;
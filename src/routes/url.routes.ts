import { Router } from "express";
import { urlController } from "../controllers/url.controllers";

const router = Router();

router.post("/", urlController.createUrl);
router.get("/:url", urlController.getUrl);
router.put("/:url", urlController.putUrl);
router.delete("/:url", urlController.deleteUrl);
router.get("/:url/stats", urlController.getStats);
export default router;

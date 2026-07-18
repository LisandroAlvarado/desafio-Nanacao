import { Router } from "express";

import {
  getCafes,
  postCafe,
  deleteCafe,
  putCafe,
} from "../controllers/cafes.controller.js";

const router = Router();

router.get("/", getCafes);

router.post("/", postCafe);

router.delete("/:id", deleteCafe);

router.put("/:id", putCafe);

export default router;

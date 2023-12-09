import express from "express";
const router = express.Router();

import { signUp } from "../controller/userController.js";

router.post("/signup", signUp);
// router.post("/signup/verify", verifyAdhaar);

export default router;

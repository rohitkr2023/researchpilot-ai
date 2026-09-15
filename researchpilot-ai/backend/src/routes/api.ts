import { Router, Request, Response } from "express";
import multer from "multer";
import { getHealth } from "../controllers/healthController.js";
import { register, login, getMe } from "../controllers/authController.js";
import { uploadPaper, listDocuments, getDocumentDetails } from "../controllers/documentController.js";
import { createProject, getProjects } from "../controllers/projectController.js";
import { synthesizeGaps, getProjectGaps } from "../controllers/gapController.js";
import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../config/db.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF documents are supported"));
  },
});

const router = Router();
router.get("/health", getHealth);
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", requireAuth, getMe);

router.post("/projects", requireAuth, createProject);
router.get("/projects", requireAuth, getProjects);

router.post("/documents/upload", requireAuth, upload.single("file"), uploadPaper);
router.get("/documents", requireAuth, listDocuments);
router.get("/documents/:id", requireAuth, getDocumentDetails);

router.post("/gaps/synthesize", requireAuth, synthesizeGaps);
router.get("/gaps", requireAuth, getProjectGaps);

export default router;

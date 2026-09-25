import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "A file is required in the 'file' field" });
  }

  res.status(201).json({
    message: "File uploaded successfully",
    file: {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
    },
  });
});

export default router;

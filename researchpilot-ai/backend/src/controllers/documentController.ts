import { Response } from "express";
import PDFParser from "pdf2json";
import { prisma } from "../config/db.js";
import { AuthRequest } from "../middleware/auth.js";
import { chunkAcademicText } from "../utils/chunker.js";

const parsePdfBuffer = (buffer: Buffer): Promise<{ pages: string[]; totalPages: number }> => {
  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);
    pdfParser.on("pdfParser_dataError", (err: any) => reject(new Error(err.parserError || "Failed to parse PDF")));
    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        const pages: string[] = [];
        const formImagePages = pdfData.Pages || [];
        for (const page of formImagePages) {
          let pageText = "";
          if (page.Texts) {
            for (const textItem of page.Texts) {
              if (textItem.R) {
                for (const r of textItem.R) {
                  pageText += decodeURIComponent(r.T) + " ";
                }
              }
            }
          }
          pages.push(pageText.trim());
        }
        resolve({ pages, totalPages: pages.length || 1 });
      } catch (err) { reject(err); }
    });
    pdfParser.parseBuffer(buffer);
  });
};

export const uploadPaper = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const { projectId, title } = req.body;
    if (!file || !projectId) {
      res.status(400).json({ error: "File and Project ID are required" });
      return;
    }
    const { pages, totalPages } = await parsePdfBuffer(file.buffer);
    const document = await prisma.document.create({
      data: {
        projectId,
        title: title || file.originalname.replace(/\.[^/.]+$/, ""),
        originalName: file.originalname,
        fileSize: file.size,
        pageCount: totalPages,
        status: "PROCESSING",
      },
    });

    const chunksToInsert = [];
    for (let i = 0; i < pages.length; i++) {
      const pageNumber = i + 1;
      const pageText = pages[i] || "Blank Page";
      await prisma.documentPage.create({
        data: { documentId: document.id, pageNumber, rawText: pageText },
      });
      const pageChunks = chunkAcademicText(pageText, pageNumber);
      for (const chk of pageChunks) {
        chunksToInsert.push({
          documentId: document.id,
          pageNumber: chk.pageNumber,
          chunkIndex: chk.chunkIndex,
          content: chk.content,
        });
      }
    }

    if (chunksToInsert.length > 0) {
      await prisma.documentChunk.createMany({ data: chunksToInsert });
    }

    const updatedDocument = await prisma.document.update({
      where: { id: document.id },
      data: { status: "COMPLETED" },
      include: { _count: { select: { pages: true, chunks: true } } }
    });

    res.status(201).json({ message: "Ingested successfully", document: updatedDocument });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listDocuments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { projectId } = req.query;
    const documents = await prisma.document.findMany({
      where: projectId ? { projectId: String(projectId) } : undefined,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { pages: true, chunks: true } } }
    });
    res.status(200).json({ documents });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to list documents" });
  }
};

export const getDocumentDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        chunks: { orderBy: [{ pageNumber: "asc" }, { chunkIndex: "asc" }] },
        project: { select: { id: true, title: true } }
      }
    });
    if (!document) {
      res.status(404).json({ error: "Document not found" });
      return;
    }
    res.status(200).json({ document });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
};

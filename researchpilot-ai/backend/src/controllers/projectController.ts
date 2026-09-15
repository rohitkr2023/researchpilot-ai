import { Response } from "express";
import { prisma } from "../config/db.js";
import { AuthRequest } from "../middleware/auth.js";

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, domainTopic } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!title) {
      res.status(400).json({ error: "Project title is required" });
      return;
    }

    const project = await prisma.researchProject.create({
      data: {
        title,
        description: description || null,
        domainTopic: domainTopic || "General Computer Science",
        userId,
      },
    });

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error: any) {
    console.error("Create Project Error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const projects = await prisma.researchProject.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        _count: {
          select: { documents: true, gaps: true, ideas: true },
        },
      },
    });

    res.status(200).json({ projects });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

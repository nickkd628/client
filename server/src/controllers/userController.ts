import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findMany();
    res.json(user);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};

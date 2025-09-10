import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prisma.product.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        take: 5,
        orderBy: {
          date: "desc",
        },
      }
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item: { date: string; amount: number }) => ({
        //might need to change like 44 to 45 not how the video looks but for some reason item is throwing an error  
        ...item,
        amount: item.amount.toString(),
      })
    );

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

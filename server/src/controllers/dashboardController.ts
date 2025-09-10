import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const getDashboardMetrics = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const popularProducts = await prisma.product.findMany({
            take: 15,
            orderBy: {
                stockQuantity: 'desc',
            },
        });

        const saleSummary = await prisma.saleSummary.findMany({
            take:5,
            orderby: {
                date: 'desc',
            },
        });

    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

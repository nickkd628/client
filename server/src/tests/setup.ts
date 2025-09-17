import { PrismaClient } from '@prisma/client';

// Mock Prisma Client for testing
const mockPrisma = {
  products: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  users: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  salesSummary: {
    findMany: jest.fn(),
  },
  purchaseSummary: {
    findMany: jest.fn(),
  },
  expenseSummary: {
    findMany: jest.fn(),
  },
  expenseByCategory: {
    findMany: jest.fn(),
  },
};

// Mock the Prisma Client constructor
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
}));

// Export mock for use in tests
export { mockPrisma };

// Global test timeout
jest.setTimeout(30000);
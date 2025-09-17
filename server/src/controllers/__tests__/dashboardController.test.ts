import request from 'supertest';
import express from 'express';
import { getDashboardMetrics } from '../dashboardController';
import { mockPrisma } from '../../tests/setup';

// Setup Express app for testing
const app = express();
app.use(express.json());
app.get('/dashboard', getDashboardMetrics);

describe('Dashboard Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getDashboardMetrics', () => {
    /**
     * Test: Should return complete dashboard metrics
     * Verifies that all dashboard components return data correctly
     */
    it('should return complete dashboard metrics', async () => {
      const mockPopularProducts = [
        {
          productId: '1',
          name: 'Product 1',
          price: 100,
          rating: 4.5,
          stockQuantity: 1000,
        },
      ];

      const mockSalesSummary = [
        {
          salesSummaryId: '1',
          totalValue: 50000,
          changePercentage: 12.5,
          date: new Date('2024-01-01'),
        },
      ];

      const mockPurchaseSummary = [
        {
          purchaseSummaryId: '1',
          totalPurchased: 30000,
          changePercentage: 8.2,
          date: new Date('2024-01-01'),
        },
      ];

      const mockExpenseSummary = [
        {
          expenseSummaryId: '1',
          totalExpenses: 15000,
          date: new Date('2024-01-01'),
        },
      ];

      const mockExpenseByCategory = [
        {
          expenseByCategoryId: '1',
          expenseSummaryId: '1',
          category: 'Office',
          amount: BigInt(5000),
          date: new Date('2024-01-01'),
        },
      ];

      // Setup mock implementations
      mockPrisma.products.findMany.mockResolvedValue(mockPopularProducts);
      mockPrisma.salesSummary.findMany.mockResolvedValue(mockSalesSummary);
      mockPrisma.purchaseSummary.findMany.mockResolvedValue(mockPurchaseSummary);
      mockPrisma.expenseSummary.findMany.mockResolvedValue(mockExpenseSummary);
      mockPrisma.expenseByCategory.findMany.mockResolvedValue(mockExpenseByCategory);

      const response = await request(app).get('/dashboard');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('popularProducts', mockPopularProducts);
      expect(response.body).toHaveProperty('salesSummary');
      expect(response.body.salesSummary[0].totalValue).toBe(50000);
      expect(response.body.salesSummary[0].changePercentage).toBe(12.5);
      expect(response.body).toHaveProperty('purchaseSummary');
      expect(response.body.purchaseSummary[0].totalPurchased).toBe(30000);
      expect(response.body).toHaveProperty('expenseSummary');
      expect(response.body.expenseSummary[0].totalExpenses).toBe(15000);
      expect(response.body).toHaveProperty('expenseByCategorySummary');

      // Verify BigInt conversion to string
      expect(response.body.expenseByCategorySummary[0].amount).toBe('5000');
    });

    /**
     * Test: Should handle BigInt amount conversion correctly
     * Verifies that BigInt values are properly converted to strings for JSON response
     */
    it('should convert BigInt amounts to strings', async () => {
      const mockExpenseByCategory = [
        {
          expenseByCategoryId: '1',
          expenseSummaryId: '1',
          category: 'Marketing',
          amount: BigInt(25000),
          date: new Date('2024-01-01'),
        },
        {
          expenseByCategoryId: '2',
          expenseSummaryId: '1',
          category: 'Technology',
          amount: BigInt(15000),
          date: new Date('2024-01-01'),
        },
      ];

      // Setup minimal mocks for other queries
      mockPrisma.products.findMany.mockResolvedValue([]);
      mockPrisma.salesSummary.findMany.mockResolvedValue([]);
      mockPrisma.purchaseSummary.findMany.mockResolvedValue([]);
      mockPrisma.expenseSummary.findMany.mockResolvedValue([]);
      mockPrisma.expenseByCategory.findMany.mockResolvedValue(mockExpenseByCategory);

      const response = await request(app).get('/dashboard');

      expect(response.status).toBe(200);
      expect(response.body.expenseByCategorySummary[0].amount).toBe('25000');
      expect(response.body.expenseByCategorySummary[1].amount).toBe('15000');
      expect(typeof response.body.expenseByCategorySummary[0].amount).toBe('string');
    });

    /**
     * Test: Should handle database errors gracefully
     * Verifies error handling when database queries fail
     */
    it('should handle database errors', async () => {
      mockPrisma.products.findMany.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/dashboard');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal server error');
    });

    /**
     * Test: Should verify correct query parameters for data fetching
     * Ensures that queries use proper ordering and limits
     */
    it('should use correct query parameters', async () => {
      // Setup mock return values
      mockPrisma.products.findMany.mockResolvedValue([]);
      mockPrisma.salesSummary.findMany.mockResolvedValue([]);
      mockPrisma.purchaseSummary.findMany.mockResolvedValue([]);
      mockPrisma.expenseSummary.findMany.mockResolvedValue([]);
      mockPrisma.expenseByCategory.findMany.mockResolvedValue([]);

      await request(app).get('/dashboard');

      // Verify products query (popular products by stock quantity)
      expect(mockPrisma.products.findMany).toHaveBeenCalledWith({
        take: 15,
        orderBy: {
          stockQuantity: 'desc',
        },
      });

      // Verify summary queries (latest 5 records)
      expect(mockPrisma.salesSummary.findMany).toHaveBeenCalledWith({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      });

      expect(mockPrisma.purchaseSummary.findMany).toHaveBeenCalledWith({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      });

      expect(mockPrisma.expenseSummary.findMany).toHaveBeenCalledWith({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      });

      expect(mockPrisma.expenseByCategory.findMany).toHaveBeenCalledWith({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      });
    });
  });
});
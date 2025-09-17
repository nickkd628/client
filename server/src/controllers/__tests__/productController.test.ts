import request from 'supertest';
import express from 'express';
import { getProducts, createProduct } from '../productController';
import { mockPrisma } from '../../tests/setup';

// Setup Express app for testing
const app = express();
app.use(express.json());
app.get('/products', getProducts);
app.post('/products', createProduct);

describe('Product Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    /**
     * Test: Should return all products when no search query provided
     * Verifies that the controller properly handles requests without search parameters
     */
    it('should return all products when no search query', async () => {
      const mockProducts = [
        {
          productId: '1',
          name: 'Test Product',
          price: 100,
          rating: 4.5,
          stockQuantity: 50,
        },
      ];

      mockPrisma.products.findMany.mockResolvedValue(mockProducts);

      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProducts);
      expect(mockPrisma.products.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: undefined,
          },
        },
      });
    });

    /**
     * Test: Should filter products by search query
     * Verifies that search functionality works correctly
     */
    it('should filter products by search query', async () => {
      const mockProducts = [
        {
          productId: '1',
          name: 'Laptop',
          price: 1000,
          rating: 4.5,
          stockQuantity: 10,
        },
      ];

      mockPrisma.products.findMany.mockResolvedValue(mockProducts);

      const response = await request(app).get('/products?search=laptop');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProducts);
      expect(mockPrisma.products.findMany).toHaveBeenCalledWith({
        where: {
          name: {
            contains: 'laptop',
          },
        },
      });
    });

    /**
     * Test: Should handle database errors gracefully
     * Verifies error handling and proper HTTP status codes
     */
    it('should handle database errors', async () => {
      mockPrisma.products.findMany.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/products');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Failed to fetch products');
    });
  });

  describe('createProduct', () => {
    /**
     * Test: Should create a new product successfully
     * Verifies that product creation works with valid data
     */
    it('should create a new product successfully', async () => {
      const newProduct = {
        productId: 'new-product-id',
        name: 'New Product',
        price: 200,
        rating: 4.0,
        stockQuantity: 25,
      };

      mockPrisma.products.create.mockResolvedValue(newProduct);

      const response = await request(app)
        .post('/products')
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newProduct);
      expect(mockPrisma.products.create).toHaveBeenCalledWith({
        data: newProduct,
      });
    });

    /**
     * Test: Should handle creation errors
     * Verifies error handling during product creation
     */
    it('should handle creation errors', async () => {
      mockPrisma.products.create.mockRejectedValue(new Error('Creation failed'));

      const newProduct = {
        productId: 'test-id',
        name: 'Test Product',
        price: 100,
        rating: 4.0,
        stockQuantity: 10,
      };

      const response = await request(app)
        .post('/products')
        .send(newProduct);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Failed to create product');
    });
  });
});
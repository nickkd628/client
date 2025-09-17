import request from 'supertest';
import express from 'express';
import { getUsers } from '../userController';
import { mockPrisma } from '../../tests/setup';

// Setup Express app for testing
const app = express();
app.use(express.json());
app.get('/users', getUsers);

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    /**
     * Test: Should return all users successfully
     * Verifies that the controller properly fetches and returns user data
     */
    it('should return all users successfully', async () => {
      const mockUsers = [
        {
          userId: '1',
          name: 'John Doe',
          email: 'john@example.com',
        },
        {
          userId: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
        },
      ];

      mockPrisma.users.findMany.mockResolvedValue(mockUsers);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(mockPrisma.users.findMany).toHaveBeenCalledWith();
    });

    /**
     * Test: Should return empty array when no users exist
     * Verifies handling of empty result sets
     */
    it('should return empty array when no users exist', async () => {
      mockPrisma.users.findMany.mockResolvedValue([]);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
      expect(Array.isArray(response.body)).toBe(true);
    });

    /**
     * Test: Should handle database errors gracefully
     * Verifies proper error handling and HTTP status codes
     */
    it('should handle database errors', async () => {
      mockPrisma.users.findMany.mockRejectedValue(new Error('Database connection failed'));

      const response = await request(app).get('/users');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Error retrieving users');
    });
  });
});
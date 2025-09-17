import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock Redux store for testing
jest.mock('./src/app/redux', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mock API hooks
jest.mock('./src/app/state/api', () => ({
  useGetDashboardMetricsQuery: jest.fn(),
  useGetProductsQuery: jest.fn(),
  useCreateProductMutation: jest.fn(),
  useGetUsersQuery: jest.fn(),
  useGetExpensesByCategoryQuery: jest.fn(),
}));

// Global test timeout
jest.setTimeout(30000);
import { render, screen, fireEvent } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import Navbar from '../Navbar';

// Mock the hooks
const mockDispatch = jest.fn();
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
  });

  /**
   * Test: Should render navbar with all essential elements
   * Verifies that the navbar displays the main header, search input, and controls
   */
  it('should render navbar with all essential elements', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = {
        global: {
          isSidebarCollapsed: false,
          isDarkMode: false,
        },
      };
      return selector(state);
    });

    render(<Navbar />);

    // Check main elements
    expect(screen.getByText('Inventory Management')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Nick DaSilva')).toBeInTheDocument();
  });

  /**
   * Test: Should toggle sidebar when menu button is clicked
   * Verifies that clicking the menu button dispatches the correct action
   */
  it('should toggle sidebar when menu button is clicked', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = {
        global: {
          isSidebarCollapsed: false,
          isDarkMode: false,
        },
      };
      return selector(state);
    });

    render(<Navbar />);

    const menuButton = screen.getAllByRole('button')[0]; // First button is the menu button
    fireEvent.click(menuButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'global/setIsSidebarCollapsed',
        payload: true, // Should toggle from false to true
      })
    );
  });

  /**
   * Test: Should toggle dark mode when moon/sun button is clicked
   * Verifies that the dark mode toggle works correctly
   */
  it('should toggle dark mode when moon/sun button is clicked', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = {
        global: {
          isSidebarCollapsed: false,
          isDarkMode: false,
        },
      };
      return selector(state);
    });

    render(<Navbar />);

    // Find the dark mode toggle button (should show Moon icon when not in dark mode)
    const darkModeButton = screen.getByRole('button', { name: /toggle dark mode/i }) ||
                          screen.getAllByRole('button').find(button => 
                            button.querySelector('svg')
                          );
    
    if (darkModeButton) {
      fireEvent.click(darkModeButton);

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'global/setIsDarkMode',
          payload: true,
        })
      );
    }
  });

  /**
   * Test: Should display sun icon when in dark mode
   * Verifies that the correct icon is shown based on dark mode state
   */
  it('should display sun icon when in dark mode', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = {
        global: {
          isSidebarCollapsed: false,
          isDarkMode: true, // Dark mode enabled
        },
      };
      return selector(state);
    });

    render(<Navbar />);

    // In dark mode, Sun icon should be displayed
    const sunIcon = document.querySelector('[data-lucide="sun"]');
    expect(sunIcon).toBeInTheDocument();
  });

  /**
   * Test: Should display moon icon when not in dark mode
   * Verifies that the correct icon is shown in light mode
   */
  it('should display moon icon when not in dark mode', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = {
        global: {
          isSidebarCollapsed: false,
          isDarkMode: false, // Light mode
        },
      };
      return selector(state);
    });

    render(<Navbar />);

    // In light mode, Moon icon should be displayed
    const moonIcon = document.querySelector('[data-lucide="moon"]');
    expect(moonIcon).toBeInTheDocument();
  });

  /**
   * Test: Should have search input with proper attributes
   * Verifies that the search input is properly configured
   */
  it('should have search input with proper attributes', () => {
    mockUseAppSelector.mockImplementation((selector) => {
      const state = {
        global: {
          isSidebarCollapsed: false,
          isDarkMode: false,
        },
      };
      return selector(state);
    });

    render(<Navbar />);

    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toHaveAttribute('type', 'search');
    expect(searchInput).toHaveClass('border-2', 'border-gray-300', 'rounded-lg');
  });
});